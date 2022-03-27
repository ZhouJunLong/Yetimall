<script>
import { mapMutations } from 'vuex'
export default {
  onLaunch: function () {
    console.log('App Launch')
    this.setUserInfoToStore()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    ...mapMutations(['setUserInfoToStore']),
  },
}
</script>

<style>
/*每个页面公共css */
@import url('./static/icon.wxss');
@import './wxcomponents/common/index.wxss';
page {
  background-color: #f3f6f9;
}
</style>
