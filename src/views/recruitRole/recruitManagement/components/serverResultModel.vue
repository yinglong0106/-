<template>
  <el-dialog title="服务权限结果" :visible.sync="open" width="700px" @closed="$emit('update:open', false)" @opened="initData">
    <div>
      <recruit-info :currentRow="currentRow"/>
      <el-divider></el-divider>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :label="'服务权限对象(' + serverCount + ')'" name="first">
          <server-target :currentRow="currentRow" @server-count="handleServerCount" ref="serverTargetRef" />
        </el-tab-pane>
        <el-tab-pane :label="'服务对接机构(' + supplyCount + ')'" name="second">
          <supply-organ :currentRow="currentRow" @supply-count="handleSupplyCount" ref="supplyOrganRef" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>
<script>
import recruitInfo from '@/views/recruitRole/recruitManagement/components/recruitInfo.vue'
import serverTarget from '@/views/recruitRole/recruitManagement/components/serverTarget.vue'
import supplyOrgan from '@/views/recruitRole/recruitManagement/components/supplyOrgan.vue'
import { getServerResultCount, getSupplyResultCount } from '@/api/recruitRoleApi/recruitManagement';

export default {
  name: 'index',
  components: {
    recruitInfo,
    serverTarget,
    supplyOrgan
  },
  props: {
    currentRow: {
      type: Object,
      default: () => {}
    },
    open: {
      type: Boolean,
      default: () => false,
    }
  },
  data() {
    return {
      activeName: 'first',
      serverCount: 0,
      supplyCount: 0
    }
  },
  created() {
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      if (tab.name === 'first') {
        this.$refs.serverTargetRef.getList()
      } else if (tab.name === 'second') {
        this.$refs.supplyOrganRef.getList()
      }
    },
    initData() {
      this.$refs.serverTargetRef.getList()
      handleServerCount('')
      handleSupplyCount('')
    },
    async handleServerCount(phonenumber) {
      const { Tag } = await getServerCount({ phonenumber, seorgGuid: this.currentRow.seorgGuid, curUserId: this.$store.state.user.adminId, })
      if (Tag && Tag.length > 0) this.serverCount = Tag[0].total
    },
    async handleSupplyCount(phonenumber) {
      const { Tag } = await getSupplyCount({ phonenumber, seorgGuid: this.currentRow.seorgGuid, curUserId: this.$store.state.user.adminId, })
      if (Tag && Tag.length > 0) this.supplyCount = Tag[0].total
    },
  },
}
</script>
