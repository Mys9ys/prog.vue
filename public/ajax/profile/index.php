<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Loader;
use Bitrix\Main\UserTable;

$_REQUEST['date'] = date(\CDatabase::DateFormatToPHP("DD.MM.YYYY HH:MI:SS"), time());

file_put_contents('../_logs/profile_log.log', json_encode($_REQUEST) . PHP_EOL, FILE_APPEND);

$_REQUEST['userId'] = 1;

if ($_REQUEST) {

    $res = new Prognos9ysProfile($_REQUEST);

    echo json_encode($res->result());

}

class Prognos9ysProfile
{
    protected $data;

    protected $arResult = [];

    protected $arFootballIds = [
        'matches' => ['code' => 'matches'],
        'prognosis' => ['code' => 'prognosis'],
        'result' => ['code' => 'result'],
    ];

    public function __construct($data)
    {
        if (!Loader::includeModule('iblock')) {
            ShowError('Модуль Информационных блоков не установлен');
            return;
        }

        var_dump($this->arFootballIds);
        $itemsList = \CIBlock::GetList([], [], false)->Fetch();



        var_dump($itemsList);


        die;

        foreach ($this->arFootballIds as $code => $el) {

            $this->arFootballIds[$code]['id'] = \CIBlock::GetList([], ['ID' => $code])->fetch();
            var_dump($this->arFootballIds);

        }

        $this->data = $data;

        $this->getUserInfo();

        $this->getUserPrognosis();

        var_dump($this->arResult);

    }

    protected function getUserInfo()
    {
        $filter['ID'] = $this->data['userId'];
        $dbUser = UserTable::getList(array(
            'select' => array('ID', 'NAME', 'PERSONAL_PHOTO'),
            'filter' => $filter
        ))->fetch();

        if ($dbUser['ID']) {
            $this->arResult['info'] = $dbUser;
        } else {
            $this->setResult('error', 'Пользователь не найден');
        }

    }

    protected function getUserPrognosis()
    {

        $arFootball = [];

        foreach ($this->arFootballIds as $code => $el) {
            $arFootball[$code] = $this->getFootBallPr($el['id']);
        }

        $this->arResult['football'] = $arFootball;

    }

    protected function getFootBallPr($ib)
    {

        $arRes = [];
        $arFilter = [
            "IBLOCK_ID" => $ib,
            "PROPERTY_USER_ID" => $this->data['userId']
        ];

        var_dump($arFilter);

        $arSelect = [
            "ID",
            "TIMESTAMP_X",
            "PROPERTY_goal_home",
            "PROPERTY_goal_guest",
            "PROPERTY_result",
            "PROPERTY_diff",
            "PROPERTY_corner",
            "PROPERTY_yellow",
            "PROPERTY_red",
            "PROPERTY_penalty",
            "PROPERTY_sum",
            "PROPERTY_offside",
            "PROPERTY_number",
            "PROPERTY_domination",
            "PROPERTY_otime",
            "PROPERTY_spenalty",
            "PROPERTY_all",
            "PROPERTY_score",
        ];

        var_dump($arSelect);

        $response = CIBlockElement::GetList(
            [],
            $arFilter,
            false,
            [],
            $arSelect,
        );

        var_dump($response->GetNext());
        die;

        while ($res = $response->GetNext()) {

            $arr = [];

            $arr["id"] = $res["ID"];
            $arr["goal_home"] = $res["PROPERTY_GOAL_HOME_VALUE"];
            $arr["goal_guest"] = $res["PROPERTY_GOAL_GUEST_VALUE"];
            $arr["all"] = $res["PROPERTY_ALL_VALUE"];
            $arr["score"] = $res["PROPERTY_SCORE_VALUE"];
            $arr["result"] = $res["PROPERTY_RESULT_VALUE"];
            $arr["sum"] = $res["PROPERTY_SUM_VALUE"];
            $arr["diff"] = $res["PROPERTY_DIFF_VALUE"];
            $arr["domination"] = $res["PROPERTY_DOMINATION_VALUE"];
            $arr["yellow"] = $res["PROPERTY_YELLOW_VALUE"];
            $arr["red"] = $res["PROPERTY_RED_VALUE"];
            $arr["corner"] = $res["PROPERTY_CORNER_VALUE"];
            $arr["penalty"] = $res["PROPERTY_PENALTY_VALUE"];
            $arr["otime"] = $res["PROPERTY_OTIME_VALUE"];
            $arr["spenalty"] = $res["PROPERTY_SPENALTY_VALUE"];

            $arRes[] = $arr;
        }

        var_dump($arRes);

        return $arRes;
    }

    protected function setResult($status, $mes, $info = '')
    {
        $this->arResult['status'] = $status;
        $this->arResult['mes'] = $mes;
        if ($info) $this->arResult['profile'] = $info;
    }

    public function result()
    {
        return $this->arResult;
    }

}
