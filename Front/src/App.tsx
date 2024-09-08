import { useTranslation } from "react-i18next";
import { Button, Divider, Flex, Form, Upload, message, Typography } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import './App.css'
import { useState } from "react";
import $ from 'jquery'
import { url } from "inspector";

const { Dragger } = Upload;
const { Title } = Typography;



const App: React.FC = () => {

  const [buttonLoading, setButtonLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDownloadAble, setIsDownloadAble] = useState(false);
  const [isUploadEnable, setIsUploadEnable] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const { t } = useTranslation();

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
    /*
    $.ajax({
      url: "./download?mode=" + mode + "&url=" + downloadUrl,
      type: "get",
      success: function (data: any) {
        
      },
      error: function (err: any) {
        messageApi.error(t("DownloadError") + err);
      },
    });*/
   }



  return (
    <>
      <Typography>

        <Title id="title">SharpDllProxy-GUI</Title>
        <p id="subtitle">{t("Subtitle")}</p>
        <Divider />
        <Flex>


          <Form name="mainForm" id="mainForm" autoComplete="off" onFinish={onFinish}  >
            <Flex justify="center" gap={"large"}>



              <Form.Item name="DLL" rules={[{ required: true, message: 'Please input your DLL!' }]}>
                <Dragger accept=".dll" maxCount={1} beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p className="ant-upload-text">{t("DLLUploadDesc")}</p>
                  <p className="ant-upload-hint">{t("DLLUploadHint")}</p>
                </Dragger>
              </Form.Item>



              <Form.Item name="Bin">
                <Dragger maxCount={1} beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p className="ant-upload-text">{t("BinUploadDesc")}</p>
                  <p className="ant-upload-hint">{t("BinUploadHint")}</p>
                </Dragger>
              </Form.Item>


            </Flex>
            <Flex gap={"large"}>


              <Form.Item >
                <Button loading={buttonLoading} disabled={isUploadEnable} htmlType="submit">{t("UploadButton")}</Button>
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


        <Divider />
        <p id="bottomText">
          {t("BottomText")}
        </p>
      </Typography>

      {contextHolder}

    </>
  )
};


export default App
