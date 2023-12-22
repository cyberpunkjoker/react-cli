import React, { useEffect, useState } from "react";
import { Form, Button } from "antd";
import "./index.less";
import FormFactory, { ParseInfoProps } from "@/components/FormFactory";

export type VerticalFormPageProps = {
  formItems: ParseInfoProps<any>[];
  onSubmit: (param: any) => void;
  onChange?: (param: any) => void;
  refresh?: (param: any) => void;
  auth?: boolean;
  extra?: React.ReactNode;
  preset?: { [key: string]: any };
  form?: any;
  isHideReset?: boolean;
};

const VerticalFormPage: React.FC<VerticalFormPageProps> = (props) => {
  const { auth = true, formItems, extra, preset, isHideReset=false } = props;
  const [form] = Form.useForm(props?.form);
  const [initParams, setInitParams] = useState({});
  /* **** methods **** */

  /**
   * 初始化，设置表单的初始值defaultValue
   */
  useEffect(() => {
    const defaultValues = formItems.reduce((prev: any, curr) => {
      const { formCompConfig } = curr;
      if (formCompConfig) {
        const { defaultValue, id } = formCompConfig;
        prev[id] = defaultValue;
      }
      return prev;
    }, {});
    setInitParams({ ...defaultValues, ...preset });
    form.setFieldsValue({ ...defaultValues, ...preset });
  }, []);

  /**
   * 重置，将当前表单所有项清空，并重置为初始值
   */
  const clearAll = () => {
    const { refresh } = props;
    const { resetFields } = form;
    resetFields();
    refresh && refresh({});
  };

  /**
   * 提交方法，通过调用外部onSubmit来扩展业务
   * @param {Object} values 绑定的key-value值
   */
  const onFinish = (values: any) => {
    const { onSubmit } = props;
    onSubmit(values);
  };

  const onValuesChange = (changedValues, allValues) => {
    const { onChange } = props;
    if (onChange && typeof onChange === 'function') {
      const prev = Object.entries(changedValues).reduce((prev: any, [key, value]: any[]) => {
        prev[key] = value === '' ? undefined : value;
        return prev;
      }, {});
      if (changedValues[Object.keys(changedValues)[0]] === '') {
        form.setFieldsValue(prev);
      }
      onChange(prev);
    }
  };

  return (
    <FormFactory
      formProps={{
        layout: 'inline',
        onFinish: onFinish,
        onValuesChange: onValuesChange,
        form,
        initialValues: initParams,
      }}
      materials={formItems}
    >
      <div className='Tools'>
        <Button type="primary" disabled={!auth} htmlType="submit">
          查询
        </Button>
        {isHideReset? '':<Button onClick={clearAll}>重置</Button>}
        {extra}
      </div>
    </FormFactory>
  );
};

export default VerticalFormPage;
