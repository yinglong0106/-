<template>
	<div class="app-container">
		<div class="tab-box">
			<div v-for="item in 15" class="tab-item">
				<div>1000</div>
				<div>当前用户名单（个）</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		components: {},
		data() {
			return {
				loading: false,
			};
		},
		methods: {
		},
		created() {
		}
	}
</script>

<style scoped lang="scss">
	.tab-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.tab-item {
			width: 33.3%;
			
			text-align: center;
			padding: 20px;
			border: 1px solid #000;
		}
	}
	
</style>
