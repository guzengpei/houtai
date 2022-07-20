// 手机号验证
export function mobileReg (mobile) {
  const reg = /^(?:(?:\+|00)86)?1\d{10}$/
  if (mobile === '') {
    return true
  } return reg.test(mobile)
}

// 邮箱验证
export function emailReg (email) {
  // console.log(1)
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // console.log(reg.test(email))
  if (email === '') {
    return true
  }
  return reg.test(email)
}
