<template>
  <div class="news_el">
    <div class="news_title">{{news.title}}</div>
    <div class="news_preview" :class="{'small': smallNews}" v-html="news.text"></div>
    <div class="btn_box">
      <span v-if="smallNews" class="btn_open" @click="smallNews = !smallNews">Подробнее</span>
      <span v-else class="btn_open" @click="smallNews = !smallNews">Скрыть</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsEl",
  data() {
    return {
      news: {
        title: 'Обновление 2.33',
        text: 'Добавлена возможность загружать аватарку.<br>' +
            '        Доступные форматы: png, gif, jpeg.<br>' +
            '        Размер картинки: не более 500кб.<br>' +
            '        Форма картинки: квадрат (обрезки пока нет).        '
      },
      smallNews: true
    }
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";
.news_el{
  background: @kerling;
  color: @colorText;
  display: flex;
  flex-direction: column;

  padding: 4px;
  border-radius: 5px;

  gap: 4px;

  margin-bottom: 4px;
  text-align: right;
  .news_title{
    .shadow_inset;
    text-align: left;
  }
  .news_preview{
    .shadow_inset;
    text-align: left;
  }
  .small{
    height: 22px;
    overflow: hidden;
  }
  .btn_box{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 2px 0;
  }
  .btn_open{
    display: inline;
    padding: 3px 8px;
    border-radius: 5px;
    .shadow_template;
    cursor: pointer;
    font-size: 12px;
    &:hover{
      opacity: 0.8;
    }
  }
}
</style>