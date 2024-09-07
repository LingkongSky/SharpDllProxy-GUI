import { useTranslation } from "react-i18next";
import { Button, Divider, Flex, Form, Upload, message, Typography } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import './App.css'
import { useState } from "react";
import $ from 'jquery'

const { Dragger } = Upload;
const { Title } = Typography;



const App: React.FC = () => {

  const [buttonLoading, setButtonLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();


  const { t } = useTranslation();

  // submit the form
  function onFinish(values:any) {

    setButtonLoading(true);

    var formData = new FormData();


    var i : number = 0;
    
    // scan the files
        if (values.files) {
            for (var file of values.files.fileList) {

                if (file.size > 1024*1024*200) {
                  messageApi.error(t("FileSizeTooBig") + "200MB");
                    setButtonLoading(false);
                    return;
                }

                var convertedFile = new File([file.originFileObj], file.name);
                formData.append("files" + i, convertedFile, convertedFile.name);
                i++;
            }
        }else{
          messageApi.info(t("PleaseUpload"));
            setButtonLoading(false);
            return;
        }


    // post the files
    $.ajax({
      url: "/Server/user/todos.php",
      type: "post",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data: any) {
        if (data == "success") {
          messageApi.success(t("Processing"));
          setButtonLoading(false);
        }
      },
      error: function (err: any) {
        messageApi.error(t("UploadError") + err);
        setButtonLoading(false);
      },
    });


  };


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
            autoComplete="off"
            onFinish={onFinish}
          >
            <Flex justify="center" gap={"large"}>
              <Form.Item
                name="DLL"
                rules={[{ required: true, message: 'Please input your DLL!' }]}
                
              >
                <Dragger accept=".dll" maxCount={1} beforeUpload={() => false}
>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">{t("DLLUploadDesc")}</p>
                  <p className="ant-upload-hint">
                    {t("DLLUploadHint")}
                  </p>
                </Dragger>
              </Form.Item>

              <Form.Item name="Bin">
                <Dragger maxCount={1} beforeUpload={() => false}>
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
              <Form.Item >
                <Button loading={buttonLoading} htmlType="submit">{t("UploadButton")}</Button>
            </Form.Item>

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

      {contextHolder}

    </>
  )
};


export default App
