import { useTranslation } from "react-i18next";
import { Button, Divider, Flex, Form, Upload, message, Typography, MenuProps, Dropdown, Space, Col } from "antd";
import { InboxOutlined, DownOutlined } from '@ant-design/icons';
import './App.css'
import { useEffect, useState } from "react";
import $ from 'jquery'

const { Dragger } = Upload;
const { Title } = Typography;


const App: React.FC = () => {

  const [buttonLoading, setButtonLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDownloadAble, setIsDownloadAble] = useState(false);
  const [isUploadEnable, setIsUploadEnable] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [language,setLanguage] = useState("zh-CN");
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a className={language == "zh-CN" ? "checked" : "none"} target="_blank" rel="noopener noreferrer" onClick={() => { changeLanguage("zh-CN")}}>
          简体中文
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a className={language == "en-US" ? "checked" : "none"} target="_blank" rel="noopener noreferrer" onClick={() => { changeLanguage("en-US") }}>
         English
        </a>
      ),
    },
  ];

  function changeLanguage(lang: string){
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('lan', lang);
  }


  // submit the form
  function onFinish(values: any) {

    setButtonLoading(true);

    var formData = new FormData();


    // scan the files
    if (values.DLL) {
      var file = values.DLL.fileList;

      //alert(JSON.stringify(file[0].name));

      var convertedFile = new File([file[0].originFileObj], file[0].name);
      formData.append("files", convertedFile, convertedFile.name);
    } else {
      messageApi.info(t("PleaseUpload"));
      setButtonLoading(false);
      return;
    }


    if (values.Bin) {
      var file = values.Bin.fileList;
      var convertedFile = new File([file[0].originFileObj], file[0].name);
      formData.append("files", convertedFile, convertedFile.name);
    }

    messageApi.info(t("InProgress"));

    // post the files
    $.ajax({
      url: "./upload",
      type: "post",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data: any) {
        if ("url" in data) {
          setIsUploadEnable(true);
          setButtonLoading(false);
          setIsDownloadAble(true);
          setDownloadUrl(data.url);
        }
      },
      error: function (err: any) {
        messageApi.error(t("UploadError") + err);
        setButtonLoading(false);
      },
    });

  };

  function donwload(mode: number) {
    window.location.href = "./download?mode=" + mode + "&url=" + downloadUrl;
   }


   function resetForm(){
    form.resetFields();
    setIsDownloadAble(false);
    setIsUploadEnable(false);
    setButtonLoading(false);
    setDownloadUrl("");
   }

  useEffect(() => {
    setLanguage(i18n.language);
  }, []);


  return (
    <>
      <Typography>

        <Title id="title">SharpDllProxy-GUI</Title>
        <p id="subtitle">{t("Subtitle")}</p>
        <Divider />
        <Flex>

          <Form form={form} name="mainForm" id="mainForm" autoComplete="off" onFinish={onFinish} wrapperCol={{ span: 24}}>
            <Flex gap={"large"} >

              <Col span={24}>
              <Form.Item name="DLL" rules={[{ required: true, message: 'Please input your DLL!' }]}>
                <Dragger className="dragger" accept=".dll" maxCount={1} beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p className="ant-upload-text">{t("DLLUploadDesc")}</p>
                  <p className="ant-upload-hint">{t("DLLUploadHint")}</p>
                </Dragger>
              </Form.Item>
              <Form.Item name="Bin">
                <Dragger className="dragger" maxCount={1} beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p className="ant-upload-text">{t("BinUploadDesc")}</p>
                  <p className="ant-upload-hint">{t("BinUploadHint")}</p>
                </Dragger>
              </Form.Item>
              </Col>

            </Flex>
            <Flex gap={"large"}>


              <Form.Item >
                <Button loading={buttonLoading} disabled={isUploadEnable} htmlType="submit">{t("UploadButton")}</Button>
              </Form.Item>
              
              <Form.Item >
              <Button onClick={() => resetForm()}>{t("ResetButton")}</Button>
              </Form.Item>

              {
                isDownloadAble &&
                <>
                  <Button onClick={() => donwload(0)}>{t("ProgDownloadButton")}</Button>
                  <Button onClick={() => donwload(1)}>{t("DllDownloadButton")}</Button>
                </>
              }


            </Flex>
          </Form>
          <p id="descrption">{t("Descrption")}</p>
        </Flex>


        <Divider className="divider2"/>

        <Dropdown className="languageChange" menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {t("ChangeLanguage")}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>


        <p id="bottomText">
          {t("BottomText")}@<a href="https://github.com/LingkongSky/SharpDllProxy-GUI">https://github.com/LingkongSky/SharpDllProxy-GUI</a>

        </p>
      </Typography>


      
      {contextHolder}

    </>
  )
};


export default App
