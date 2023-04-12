<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

header('Content-Type: text/html; charset=utf-8');

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

use Bitrix\Main\Loader;


class Prognos9ysGetEventsInfo{

    protected $eventsIb;
    protected $eventsTypeIb;

    public function __construct()
    {
        if (!Loader::includeModule('iblock')) {
            ShowError('Модуль Информационных блоков не установлен');
            return;
        }


        $this->eventsIb = \CIBlock::GetList([], ['CODE' => 'events'], false)->Fetch()['ID'] ?: 1;
        $this->eventsTypeIb = \CIBlock::GetList([], ['CODE' => 'eventtype'], false)->Fetch()['ID'] ?: 19;
    }

    protected function getEventsType(){

    }

    protected function getEvents(){

    }
}