export default [
  { prop: "name", label: "昵称", type: "input" },
  { prop: "username", label: "用户名", type: "input" },
  { prop: "email", label: "邮箱", type: "input" },
  { prop: "phone", label: "电话", type: "input" },
  {
    prop: "sex",
    label: "性别",
    type: "select",
    options: [
      { label: "男", value: 1 },
      { label: "女", value: 2 },
    ],
  },
]
