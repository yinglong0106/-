<template>
  <el-dialog title="服务机构团队" :visible.sync="open" width="700px" @closed="$emit('update:open', false)" @opened="initData">
    <div>
      <recruit-info :currentRow="currentRow"/>
      <el-divider></el-divider>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :label="'服务专员团队(' + serverCount + ')'" name="first">
          <server-staff :currentRow="currentRow" @server-count="handleServerCount" ref="serverStaffRef" />
        </el-tab-pane>
        <el-tab-pane :label="'供应专员团队(' + supplyCount + ')'" name="second">
          <supply-staff :currentRow="currentRow" @supply-count="handleSupplyCount" ref="supplyStaffRef" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>
<script>
import recruitInfo from '@/views/recruitRole/recruitManagement/components/recruitInfo.vue'
import serverStaff from '@/views/recruitRole/recruitManagement/components/serverStaff.vue'
import supplyStaff from '@/views/recruitRole/recruitManagement/components/supplyStaff.vue'
import { getServerCount, getSupplyCount } from '@/api/recruitRoleApi/recruitManagement';

export default {
  name: 'index',
  components: {
    recruitInfo,
    serverStaff,
    supplyStaff
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
      supplyCount: 0,
    }
  },
  created() {
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
      if (tab.name === 'first') {
        this.$refs.serverStaffRef.getList()
      } else if (tab.name === 'second') {
        this.$refs.supplyStaffRef.getList()
      }
    },
    initData() {
      this.$refs.serverStaffRef.getList()
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
