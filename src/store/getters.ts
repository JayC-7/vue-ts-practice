const getters = {
    asyncRoutes: (state: any) => state.utils.asyncRoutes,
    loading: (state: any) => state.utils.loading,
    userProfile: (state: any) => state.user.userProfile,
}

export default getters;