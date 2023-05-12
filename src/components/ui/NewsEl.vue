<template>
  <div class="news_el">
    <div class="news_title">Обновление 2.33</div>
    <div class="news_preview" :class="{'small': smallNews}">Добавлена возможность загружать аватарку.
      Доступные форматы: png, gif, jpeg.
      Размер изображения не более 500кб.
      Форма - квадрат (обрезки пока нет).
    </div>
    <div v-if="smallNews" class="btn_open" @click="smallNews = !smallNews">Подробнее</div>
    <div v-else class="btn_open" @click="smallNews = !smallNews">Скрыть</div>
  </div>
</template>

<script>
export default {
  name: "NewsEl",
  data() {
    return {
      news: {
        title: 'Обновление 2.33',
        text: 'Добавлена возможность загружать аватарку.\n' +
            '        Доступные форматы: png, gif, jpeg.\n' +
            '        Размер изображения не более 500кб.\n' +
            '        Форма - квадрат (обрезки пока нет).        '
      },
      nearest: false,
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
    height: 24px;
    overflow: hidden;
  }
  .btn_open{
    display: inline;
    padding: 3px 8px;
    border-radius: 5px;
    .shadow_template;
    cursor: pointer;
    &:hover{
      opacity: 0.8;
    }
  }
}
</style>