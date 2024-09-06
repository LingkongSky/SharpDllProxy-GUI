import { useTranslation } from "react-i18next";
import './App.css'
import { Button, Divider, Flex, Form, Typography } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from '@ant-design/icons';
const { Title} = Typography;
function App() {
  const { t } = useTranslation();

  return (
    <>
      <Typography>

        <Title id="title">SharpDllProxy-GUI</Title>
        <p id="subtitle">{t("Subtitle")}</p>
      <Divider />
      <Flex>
        <Form  
        name="mainForm"
        id="mainForm"
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Flex justify="center" gap={"large"}>
        <Form.Item
          name="DLL"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Dragger>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
                  <p className="ant-upload-text">{t("DLLUploadDesc")}</p>
            <p className="ant-upload-hint">
                    {t("DLLUploadHint")}
            </p>
          </Dragger>
              </Form.Item>

        <Form.Item
          name="bin"
          rules={[{ required: false, message: 'Please input your password!' }]}
        >
          <Dragger >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
                  <p className="ant-upload-text">{t("BinUploadDesc")}</p>
            <p className="ant-upload-hint">
                    {t("BinUploadHint")}
            </p>
          </Dragger>        
          </Form.Item>
        </Flex>

            <Flex gap={"large"}>

            <Button>{t("UploadButton")}</Button>
            <Button disabled>{t("DownloadButton")}</Button>
    </Flex>

      </Form>

          <p id="descrption">{t("Descrption")}</p>

      </Flex>

      <Divider />
        <p id="bottomText">
          {t("BottomText")}
      </p>
      </Typography>
    </>
  )
}


export default App
