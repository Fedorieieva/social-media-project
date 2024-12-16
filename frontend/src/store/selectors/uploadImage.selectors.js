export const selectUploadedProfileImage = (state) => state.uploadImage.profileImgSrc;
export const selectUploadedPostImages = (state) => state.uploadImage.postImgSrc;
export const selectIsLoadingImages = (state) => state.uploadImage.loading;