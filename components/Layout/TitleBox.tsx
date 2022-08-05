import Image from "next/image";

const TItleBox = ({title}):JSX.Element => {
    
    return(
        <div className="title-box">
            <div className="title">
                <Image src={require('public/images/titleIcon.png')} width={18} height={17} alt="" className="titleIcon"/>
                <div>{title}</div>
            </div>
            <style jsx>
            {`
                .title-box{
                    padding: 12px;
                }
                .title{
                font-size: 14px;
                    display: flex;
                    gap: 4px;
                }
            `}
            </style>
        </div>
    )
}

export default TItleBox