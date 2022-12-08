import Image from 'next/image'

const TitleBox = ({ title }): JSX.Element => {
  return (
    <div className="title-box">
      <div className="title">
        <Image
          src={require('public/images/titleIcon.png')}
          width={20}
          height={20}
          alt=""
          className="titleIcon"
        />
        <div>{title}</div>
      </div>
      <style jsx>
        {`
          .title-box {
            padding: 12px;
          }
          .title {
            font-size: 14px;
            display: flex;
            gap: 4px;
            align-items:center;
          }
        `}
      </style>
    </div>
  )
}

export default TitleBox
