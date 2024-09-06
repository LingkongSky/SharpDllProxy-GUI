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

        <Title className="title">SharpDllProxy-GUI</Title>
        <p className="descrption">{t("descrption")}</p>
      <Divider />
      <Flex>
        <Form
        name="mainForm"
        id="mainForm"
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{ width: "50%" }}
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
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
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
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>        
          </Form.Item>
        </Flex>

          <Button>Primary Button</Button>
          <br />
          <br />
          <Button disabled>Primary Button</Button>
      </Form>
        <Divider type={"vertical"}/>

          <p className="descrption">description</p>

      </Flex>

      <Divider />
        <p className="descrption">
        Provide by LingkongSky
      </p>
      </Typography>
    </>
  )
}


export default App
