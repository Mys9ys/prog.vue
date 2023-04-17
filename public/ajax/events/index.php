<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

header('Content-Type: text/html; charset=utf-8');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Loader;


$res = new Prognos9ysGetEventsInfo();

echo json_encode($res->getResult());

class Prognos9ysGetEventsInfo{

    protected $eventsIb;
    protected $eventsTypeIb;

    protected $arEvents = [];

    public function __construct()
    {
        if (!Loader::includeModule('iblock')) {
            ShowError('Модуль Информационных блоков не установлен');
            return;
        }


        $this->eventsIb = \CIBlock::GetList([], ['CODE' => 'events'], false)->Fetch()['ID'] ?: 1;
        $this->eventsTypeIb = \CIBlock::GetList([], ['CODE' => 'eventtype'], false)->Fetch()['ID'] ?: 19;

        $this->getEvents();
        $this->getEventsType();

    }

    protected function getEventsType(){
        $arFilter = [
            'IBLOCK_ID' => $this->eventsTypeIb,
        ];

        $response = CIBlockElement::GetList(
            [],
            $arFilter,
            false,
            [],
            ["ID","NAME", "CODE"]
        );
        while ($res=$response->GetNext()){
            $this->arEvents[$res["ID"]]["info"] = $res;
        }

    }

    protected function getEvents(){
        $arFilter = [
            'IBLOCK_ID' => $this->eventsIb,
        ];

        $response = CIBlockElement::GetList(
            [],
            $arFilter,
            false,
            [],
            ["ID","NAME","PREVIEW_PICTURE", "DETAIL_TEXT", "ACTIVE", "PREVIEW_TEXT", "EXTERNAL_ID", "PROPERTY_e_type"]
        );
        while ($res=$response->GetNext()){

            $res["img"] = CFile::GetPath($res["PREVIEW_PICTURE"]);

            if($res["ACTIVE"] === 'Y') {
                $this->arEvents[$res["PROPERTY_E_TYPE_VALUE"]]["active"][$res["ID"]] = $res;
            } else {
                $this->arEvents[$res["PROPERTY_E_TYPE_VALUE"]]["old"][$res["ID"]] = $res;
            }

        }
    }

    public function getResult(){
        return [
            "status" => 'ok',
            "events" =>$this->arEvents
        ];
    }
}