export const getTagType = (status) => {
  switch (status) {
    case "通過":
      return "success";
    case "審核中":
      return "warning";
    case "未通過":
    case "不通過":
      return "danger";
    default:
      return "info";
  }
};