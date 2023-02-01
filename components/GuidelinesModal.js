import { Modal,Button } from "antd"

import styles from  "../styles/eachevent.module.css"

const GuidelinesModal = ({guidelinesModalOpen,closeGuidelinesModal}) => {
    const data  =   {
        guidelines:[
{   data:
            'You should be cautious when entering your information in the registration portal as it will appear on your certificates issued.'
            ,id:1
}
            ,
{   data:
            'Before proceeding to fee payment, all participants must completely fill out the registration details. It is not possible to make any changes once you have entered your information.'
            ,id:2
 }           
            ,
            {   data:
            'Certificates will be issued to all workshop participants upon completion of the workshop.'
            ,id:3
            }
            ,
{   data:
            'If you have any queries, please feel free to contact one of our workshop coordinators.'
            ,id:4
 }           
            ,
        ]
    }
  return (
    <Modal  title={`Workshops Guidelines`}  open={guidelinesModalOpen} onOk={closeGuidelinesModal}  onCancel={closeGuidelinesModal}
        footer={[
            <Button key="back" onClick={closeGuidelinesModal}>
            Close
          </Button>
        ]}
    >
        <h3>Before registering for this workshop, please read the following instructions:</h3>
        <ol className={styles.modalPadding}>
            {
                data.guidelines.map(x=>( <li key={x.id}   className={styles.listItemPadding}>{x.data}</li> ))
            }
        </ol>
    </Modal>
  )
}

export default GuidelinesModal