const dipatch = {
	state: {
    startDate:'',
    endDate:'',
		target:[],
    commuteUser:[],
    serviceName:null,
    communication:null,
    mechanism:'',
    roleType:''
	},

	mutations: {
    SET_STARTDATE:(state, data)=>{
			state.startDate = data
    },
    SET_ENDDATE:(state, data)=>{
			state.endDate = data
    },
		SET_TARGET: (state, data) => {
      console.log(data)
			state.target = data
		},
    DEL_TARGET:(state, data)=>{
      state.target = data
    },
    SET_COMMUTEUSER:(state, data) => {
      console.log(data)
			state.commuteUser = data
		},
    SET_SERVICENAME:(state, data)=>{
      state.serviceName = data
    },
    SET_COMMUNICATION:(state, data)=>{
      state.communication = data
    },
    SET_MECHANISM:(state, data)=>{
      state.mechanism = data
    },
    SET_ROLETYPE:(state, data)=>{
      state.roleType = data
    },
    SET_CLEAR:(state, data)=>{
      state.startDate=''
      state.endDate=''
      state.target=[]
      state.commuteUser=[]
      state.serviceName=null
      state.communication=null
      state.mechanism=''
      state.roleType=''
    }
  }
}

export default dipatch
