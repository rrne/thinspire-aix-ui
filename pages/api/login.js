import AILogionData from 'public/data/AILoginData.json'
import AIXLoginData from 'public/data/AIXLoginData.json'
import useStore from 'stores'

export default (req, res) => {
  const store = useStore().Main
  const loginData = store.module === 'AIX' ? AIXLoginData : AILogionData

  if (req.method === 'POST') {
    const { id, pw } = req.body

    const user = loginData.loginInfo.filter((list) => {
      return list.id === id && list.pw === pw
    })
    if (user.length !== 0) {
      res.setHeader('Set-Cookie', 'a_name=user;Max-Age=3600;HttpOnly,Secure')
      res.status(201).json({ message: '로그인에 성공했습니다.' })
    } else {
      res.status(200).json({ message: '아이디나 비밀번호를 확인해주세요' })
    }
  }
}
