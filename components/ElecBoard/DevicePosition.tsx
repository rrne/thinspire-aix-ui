import useStore from 'stores'
import { observer } from 'mobx-react-lite';
import { Modal, Tabs, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useEffect, useState } from 'react'
const { TabPane } = Tabs;
import DeviceModalComp from './DeviceModalComp'

export interface DataType {
  key: React.Key;
  device_name: string;
  now_usage_elec: number;
  today_usage_elec: number;
  yesterday_usage_elec: number;
}

const DevicePosition = observer((): JSX.Element => {

  const elec = useStore().Elec;
  const [table,setTable] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const [modalData, setModalData] = useState<DataType>()

  useEffect(() => {
    if(!elec.deviceUsageStatus) return;
    const data = [...elec.deviceUsageStatus.items];
    for(let i = 0; i < data.length; i++){
      data[i]["key"] = i
    }
    setTable(data)

  },[elec.deviceUsageStatus])

  const onChange = (key: string) => {
    console.log(key);
  };

  const tableOnChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const showNowElecMoal = (record) => {
    console.log(record);
    setModalData(record);
    setIsModalVisible(true)
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: '설비명',
      dataIndex: 'device_name',
      width:400
    },
    {
      title: '현재 사용전력',
      dataIndex: 'now_usage_elec',
      sorter: {
        compare: (a, b) => a.now_usage_elec - b.now_usage_elec,
        multiple: 3,
      },
      render:(text, record) => <div className='data today' onClick={() => showNowElecMoal(record)}>{text} <span className="unit">kWh</span></div>
    },
    {
      title: '금일 평균 사용전력',
      dataIndex: 'today_usage_elec',
      sorter: {
        compare: (a, b) => a.today_usage_elec - b.today_usage_elec,
        multiple: 2,
      },
      render:(text) => <div className='data'>{text} <span className="unit">kWh</span></div>
    },
    {
      title: '전일 평균 사용전력',
      dataIndex: 'yesterday_usage_elec',
      sorter: {
        compare: (a, b) => a.yesterday_usage_elec - b.yesterday_usage_elec,
        multiple: 1,
      },
      render:(text) => <div className='data'>{text} <span className="unit">kWh</span></div>
    },
  ];
  

  return (
    <div className="device-position">
      <Tabs
        onChange={onChange}
        type="card"
      >
        <TabPane tab="전력 사용 현황" key="1">
        <div className="table-box">
        <div className="table">
        <Table columns={columns} dataSource={table} onChange={tableOnChange} pagination={false} scroll={{ y: "100%"}} showSorterTooltip={false}/>
        </div>
      </div>
        </TabPane>
        {/* {selectFactory && selectFactory.elecbg ? <TabPane tab="공장 도면" key="2">
            <div className="img-box">
              <Image src={`/images/${selectFactory.elecbg}.png`} layout="fill" />
              </div>
        </TabPane> : ""} */}
      </Tabs>
      {/* <img
        src={require('public/images/elec_deviceposition.png')}
        alt=""
        className="bg"
      /> */}

      {/* <TitleBox title="전력 사용 현황" /> */}
      {/* <img
        src={require('public/images/positionbg.png')}
        alt=""
        className="positionBg"
      /> */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        wrapClassName="chartModal"
      >
        <DeviceModalComp data={modalData} />
      </Modal>
    </div>
  )
})

export default DevicePosition
