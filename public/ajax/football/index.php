<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

header('Content-Type: text/html; charset=utf-8');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Loader;

$token = 'cae9-191b-aa1d-f416-3998-8bc0-8278-ee90';
//$event = 6664;
$event = 34;

$arData = [
    'token' => $token,
    'event' => $event
];

$res = new FootballHandlerClass($arData);

echo json_encode($res->result());

class FootballHandlerClass
{

    protected $matchesIb;
    protected $eventsIb;
    protected $groupIb;
    protected $teamsIb;
    protected $prognIb;
    protected $resultIb;

    protected $userId;
    protected $eventId;

    protected $arTeams = [];

    protected $arError = [];

    protected $arNumbertoMatchId = [];

    protected $arUserPrognosis = [];
    protected $arUserResults = [];

    protected $arResult = [
        'status' => 'ok'
    ];

    public function __construct($data)
    {
        if (!Loader::includeModule('iblock')) {
            ShowError('Модуль Информационных блоков не установлен');
            return;
        }

        $this->eventsIb = \CIBlock::GetList([], ['CODE' => 'events'], false)->Fetch()['ID'] ?: 1;
        $this->matchesIb = \CIBlock::GetList([], ['CODE' => 'matches'], false)->Fetch()['ID'] ?: 2; // установочные данные матча
        $this->groupIb = \CIBlock::GetList([], ['CODE' => 'group'], false)->Fetch()['ID'] ?: 5;
        $this->teamsIb = \CIBlock::GetList([], ['CODE' => 'countries'], false)->Fetch()['ID'] ?: 3; //команды/страны
        $this->prognIb = \CIBlock::GetList([], ['CODE' => 'prognosis'], false)->Fetch()['ID'] ?: 6; //прогнозы
        $this->resultIb = \CIBlock::GetList([], ['CODE' => 'result'], false)->Fetch()['ID'] ?: 7; //результаты футбол

        if ($data['event']) $this->eventId = $data['event'];

        if ($data['token']) {
            $userRes = new GetUserIdForToken($data['token']);
            $this->userId = $userRes->getId();
        }

        $this->getUserPrognos();
        $this->getUserResult();

        $this->getTeamInfo();

        $this->getMatchOfData();

        $this->reverseArrayOldMatches();

    }

    protected function getMatchOfData()
    {
        $arFilter = [
            'IBLOCK_ID' => $this->matchesIb,
            'PROPERTY_EVENTS' => $this->eventId
        ];

        $response = CIBlockElement::GetList(
            ["DATE_ACTIVE_FROM" => "ASC", "created" => "ASC"],
            $arFilter,
            false,
            [],
            [
                "ID",
                "ACTIVE",
                "DATE_ACTIVE_FROM",
                "PROPERTY_home",
                "PROPERTY_goal_home",
                "PROPERTY_guest",
                "PROPERTY_goal_guest",
                "PROPERTY_group",
                "PROPERTY_stage",
                "PROPERTY_number",
            ]
        );

        while ($res = $response->GetNext()) {
            $this->arNumberToMatchId[$res["PROPERTY_NUMBER_VALUE"]] = $res['ID'];
            $el = [];

            $date = explode("+", ConvertDateTime($res["ACTIVE_FROM"], "DD.MM+HH:Mi"));

            $el["date"] = $date[0];
            $el["time"] = $date[1];

            $el["active"] = $res["ACTIVE"];
            $el["number"] = $res["PROPERTY_NUMBER_VALUE"];

            $el["teams"]["home"] = $this->getTeamData($this->arTeams[$res["PROPERTY_HOME_VALUE"]], $res["PROPERTY_GOAL_HOME_VALUE"]);
            $el["teams"]["guest"] = $this->getTeamData($this->arTeams[$res["PROPERTY_GUEST_VALUE"]], $res["PROPERTY_GOAL_GUEST_VALUE"]);

//            $el["write"] = $this->arUserPrognosis[$res["ID"]] ?? '';
            if ($this->eventId === 34) {
                $this->arNumbertoMatchId[$res["ID"]] = $el["number"];
                $this->getUserPrognosisOld($res["ID"]);
                $this->getUserResultOld($res["ID"]);
            }

            $el["send_info"]["send_time"] = $this->arUserPrognosis[$el["number"]] ?? '';
            $el["send_info"]["score_result"] = $this->arUserResults[$el["number"]] ?? '';

            // блок разделения матчей на 4 категории по дате
            $now = date(\CDatabase::DateFormatToPHP("DD.MM.YYYY"), time());
            $now = date_create($now);

            $dateMatch = date_create(explode(' ', $res["ACTIVE_FROM"])[0]);

            $interval = date_diff($dateMatch, $now);
            $intervalDay = $interval->format('%R%a');

            if ($intervalDay > 0 && $intervalDay < 2) {
                $this->arResult['matches']['recent'][$el["date"]][$el["number"]] = $el;
                continue;
            }

            if ($intervalDay > 1) {
                $this->arResult['matches']['past'][$el["date"]][$el["number"]] = $el;
                continue;
            }

            if ($intervalDay < 1 && $intervalDay > -2) {
                $this->arResult['matches']['nearest'][$el["date"]][$el["number"]] = $el;
                continue;
            }
            if ($intervalDay < 0) {
                $this->arResult['matches']['future'][$el["date"]][$el["number"]] = $el;
                continue;
            }

        }

    }

    protected function reverseArrayOldMatches()
    {
        $this->arResult['matches']['recent'] = array_reverse($this->arResult['matches']['recent'], true);
        $this->arResult['matches']['past'] = array_reverse($this->arResult['matches']['past'], true);
    }

    protected function getUserPrognos()
    {

        $arFilter = [
            'IBLOCK_ID' => $this->prognIb,
            'PROPERTY_EVENTS' => $this->eventId,
            'PROPERTY_USER_ID' => $this->userId
        ];

        $response = CIBlockElement::GetList(
            [],
            $arFilter,
            false,
            [],
            [
                "PROPERTY_number",
                "DATE_ACTIVE_FROM",
            ]
        );

        while ($res = $response->GetNext()) {
            $this->arUserPrognosis[$res["PROPERTY_NUMBER_VALUE"]] = ConvertDateTime($res["DATE_ACTIVE_FROM"], "DD.MM HH:Mi");
        }

    }

    protected function getUserPrognosisOld($matchId)
    {
        $arFilter = [
            'IBLOCK_ID' => $this->prognIb,
            'PROPERTY_ID' => $matchId,
            'PROPERTY_USER_ID' => $this->userId
        ];

        $res = CIBlockElement::GetList(
            [],
            $arFilter,
            false,
            [],
            [
                "PROPERTY_number",
                "PROPERTY_id",
                "DATE_ACTIVE_FROM",
            ]
        )->GetNext();

        $this->arUserPrognosis[$this->arNumbertoMatchId[$res['PROPERTY_ID_VALUE']]] = ConvertDateTime($res["DATE_ACTIVE_FROM"], "DD.MM HH:Mi");

    }

    protected function getUserResult()
    {
        $arFilter = [
            'IBLOCK_ID' => $this->resultIb,
            'PROPERTY_EVENTS' => $this->eventId,
            'PROPERTY_USER_ID' => $this->userId
        ];

        $response = CIBlockElement::GetList(
            [],
            $arFilter,
            false,
            [],
            [
                "PROPERTY_all",
                "PROPERTY_number",

            ]
        );

        while ($res = $response->GetNext()) {
            $this->arUserResults[$res['PROPERTY_NUMBER_VALUE']] = $res["PROPERTY_ALL_VALUE"];
        }
    }

    protected function getUserResultOld($matchId)
    {
        $arFilter = [
            'IBLOCK_ID' => $this->resultIb,
            'PROPERTY_MATCH_ID' => $matchId,
            'PROPERTY_USER_ID' => $this->userId
        ];

        $res = CIBlockElement::GetList(
            [],
            $arFilter,
            false,
            [],
            [
                "ID",
                "PROPERTY_all",
                "PROPERTY_match_id",
            ]
        )->GetNext();

        $this->arUserResults[$this->arNumbertoMatchId[$res['PROPERTY_MATCH_ID_VALUE']]] = $res["PROPERTY_ALL_VALUE"];

    }

    protected function getTeamInfo(): void
    {

        $response = \Bitrix\Iblock\ElementTable::getList(
            [
                'select' => ['ID', 'NAME', 'PREVIEW_PICTURE'],
                'filter' => [
                    "IBLOCK_ID" => $this->teamsIb,
                ]
            ]
        );

        while ($res = $response->fetch()) {
            $res["flag"] = CFile::GetPath($res["PREVIEW_PICTURE"]);
            $this->arTeams[$res["ID"]] = $res;
        }

    }

    protected function getTeamData($data, $goals): array
    {
        return [
            'flag' => $data['flag'],
            'name' => $data['NAME'],
            'goals' => $goals ?? 0
        ];
    }

    public function result()
    {
        return $this->arResult;
    }
}