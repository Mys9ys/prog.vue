<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

header('Content-Type: text/html; charset=utf-8');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Loader;

file_put_contents('../../_logs/ratings.json', json_encode($_REQUEST), FILE_APPEND);



$res = new CreateFootballRatings(["event" => 34]);



class CreateFootballRatings{

    protected $resultIb;


    protected $arUsers = [];
    protected $arResults = [];

    protected $arOneEventResult = [];

    protected $best = [];

    protected $count = 0;

    protected $eventId;

    protected $ArMatchIdForNumber = [];

    public function __construct($data)
    {
        if (!Loader::includeModule('iblock')) {
            ShowError('Модуль Информационных блоков не установлен');
            return;
        }

        $this->resultIb = \CIBlock::GetList([], ['CODE' => 'result'], false)->Fetch()['ID'] ?: 7;

        $this->eventId = $data["event"];

        if($this->eventId){
            $getArrMIFN = new GetArrMatchIdForNumber($this->eventId);
            $this->ArMatchIdForNumber = $getArrMIFN->getResult();

            $this->getUsers();

            $this->getResults();
        }



    }

    protected function getUsers()
    {
        $row = Bitrix\Main\UserTable::getList([
            "select" => ["ID", "NAME", "PERSONAL_PHOTO"],
        ]);

        while ($res = $row->fetch()) {
            $this->arUsers[$res["ID"]]["name"] = $res["NAME"];
            $this->arUsers[$res["ID"]]["img"] = $res["PERSONAL_PHOTO"] ? CFile::GetPath($res["PERSONAL_PHOTO"]) : null;
        }
    }

    protected function getResults()
    {
        $arFilter["IBLOCK_ID"] = $this->resultIb;

        $arrSelector = [
            "all",
            "score",
            "result",
            "sum",
            "diff",
            "domination",
            "yellow",
            "red",
            "corner",
            "penalty",
            "otime",
            "spenalty",
        ];


        if($this->eventId == 34) {
            $arFilter["!=PROPERTY_events"] = 6664;
        } else {
            $arFilter["PROPERTY_events"] = $this->eventId;
        }

        $response = CIBlockElement::GetList(
            [],
            $arFilter,
            false,
            [],
            [
                "ID",
                "DATE_ACTIVE_FROM",
                "PROPERTY_all",
                "PROPERTY_score",
                "PROPERTY_number",
                "PROPERTY_match_id",
                "PROPERTY_user_id",
                "PROPERTY_result",
                "PROPERTY_diff",
                "PROPERTY_corner",
                "PROPERTY_yellow",
                "PROPERTY_red",
                "PROPERTY_penalty",
                "PROPERTY_sum",
                "PROPERTY_domination",
                "PROPERTY_otime",
                "PROPERTY_spenalty",
            ]
        );

        while ($res = $response->GetNext()) {

            foreach ($arrSelector as $selector) {
                $number = $this->ArMatchIdForNumber[$res["PROPERTY_MATCH_ID_VALUE"]];
                $this->arResults[$selector][$number][$res["PROPERTY_USER_ID_VALUE"]] =
                    $this->arResults[$selector][$number-1][$res["PROPERTY_USER_ID_VALUE"]] + $res["PROPERTY_" . strtoupper($selector) . "_VALUE"] ?? 0;

                if ($res["PROPERTY_ALL_VALUE"] > 30) {

                }
            }


//            $this->arResults[$res["PROPERTY_USER_ID_VALUE"]][$res["PROPERTY_MATCH_ID_VALUE"]] = $res;
//
//            if ($res["PROPERTY_ALL_VALUE"] > 30) {
//                if(!$res["PROPERTY_NUMBER_VALUE"]) {
//                    $res["PROPERTY_NUMBER_VALUE"] = +$res["PROPERTY_MATCH_ID_VALUE"];
//                } else {
//                    $res["PROPERTY_NUMBER_VALUE"] += 42;
//                }
//                $this->best[$res["PROPERTY_USER_ID_VALUE"] . '-' . $res["PROPERTY_NUMBER_VALUE"]] = $res["PROPERTY_ALL_VALUE"];
//            }
//
//            $this->arOneEventResult["users"][$res["PROPERTY_USER_ID_VALUE"]] = [];
//        }
//
//        $this->count = count($this->arResults[20]);
        }
        var_dump(count($this->arResults["all"]));
        var_dump($this->arResults);

    }
}