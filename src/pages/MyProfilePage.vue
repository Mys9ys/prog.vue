<template>
  <PageHeader class="header">Ваш профиль</PageHeader>

  <div class="title_block">
    <div class="title_wrapper" v-for="(el, index) in profileMenu" :key="index" @click="active = index" :class="{'active':active === index}">
      <div class="title">
        <div class="icon">{{ el.icon }}</div>
        <div class="name" v-if="index === active">{{ el.title }}</div>
      </div>
    </div>
  </div>

  <div class="body_block">
    <div class="body_item" v-if="active === 'prognosis'">prognosis</div>
    <div class="body_item" v-if="active === 'achievement'">
      <ProfileAchievementBlock></ProfileAchievementBlock>
    </div>
    <div class="body_item" v-if="active === 'settings'">settings</div>

  </div>
</template>

<script>
import PageHeader from "@/components/main/PageHeader";
import ProfileAchievementBlock from "@/components/achievement/ProfileAchievementBlock";

export default {
  name: "MyProfilePage",
  components: {
    PageHeader,
    ProfileAchievementBlock
  },
  data() {
    return {
      active: 'prognosis',
      profileMenu: {
        'prognosis': {'title': 'Прогнозы', 'icon': 'Pr'},
        'achievement': {'title': 'Награды', 'icon': 'Ac'},
        'settings': {'title': 'Настройки', 'icon': 'Se'},
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/css/variables.less";

.title_block {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.title_wrapper {
  background: @DarkColorBG;
  padding: 4px;
  border-radius: 5px;
  color: @colorText;
  margin-top: 25px;
  text-align: left;
  margin-bottom: 10px;

  .title {
    display: flex;
    flex-direction: row;
    gap: 2px;
    .shadow_inset;
  }
  &.active{
    background: @YesWrite;
  }
}
</style>