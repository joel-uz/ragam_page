import { Modal,Button } from "antd"

import styles from  "../styles/eachevent.module.css"

const GuidelinesModal = ({guidelinesModalOpen,closeGuidelinesModal}) => {
    const data  =   {
        guidelines:[
            'Tourner dans le vide vide Tourne dans le vie',
            'Tourner dans le vide vide Tourne dans le vie',
            'Tourner dans le vide vide Tourne dans le vie',
            'Tourner dans le vide vide Tourne dans le vie',
            'Tourner dans le vide vide Tourne dans le vie',
            'Tourner dans le vide vide Tourne dans le vie',
            'Tourner dans le vide vide Tourne dans le vie',
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
        <ol className={styles.modalPadding}>
            {
                data.guidelines.map(x=>( <li    className={styles.listItemPadding}>{x}</li> ))
            }
        </ol>
    </Modal>
  )
}

export default GuidelinesModal