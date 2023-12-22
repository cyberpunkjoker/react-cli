import React from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  Cascader,
  DatePicker,
  Checkbox,
  InputNumber,
  TimePicker,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import classnames from 'classnames';
import './index.less';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import { SelectProps } from 'antd/lib/select';
import { RadioGroupProps } from 'antd/lib/radio';
import { CascaderProps } from 'antd/lib/cascader';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { RangePickerProps, DatePickerProps } from 'antd/lib/date-picker';
import { TimePickerProps } from 'antd/lib/time-picker';
import { FormProps, FormItemProps } from 'antd/lib/form';
import { SwitchProps } from 'antd/lib/switch';
import { TreeSelectProps } from 'antd/lib/tree-select';
import { UploadProps } from 'antd/lib/upload';

const { RangePicker } = DatePicker;

/** 动态获取类型 */
export type StrategyPropsType = {
  /** 输入框 */
  text: InputProps;
  /** 数字输入框 */
  inputNumber: InputNumberProps;
  /** 小输入框 */
  minitext: InputProps;
  /** 文本编辑框 */
  textarea: TextAreaProps;
  /** 单选框 */
  radio: RadioGroupProps;
  /** 选择框 */
  select: SelectProps<any>;
  /** 级联选择器 */
  cascader: CascaderProps;
  /** 复选框 */
  checkbox: CheckboxGroupProps;
  /** 日期范围选择 */
  rangePicker: RangePickerProps;
  /** 日期选择 */
  datePicker: DatePickerProps;
  /** 时间选择 */
  timePicker: TimePickerProps;
  /** 开关 */
  switch: SwitchProps;
  /** 树形选择器 */
  treeSelect: TreeSelectProps<any>;
  /** 上传组件 */
  upload: UploadProps<any>;
};

export type ParseInfoOption = { value: any; content: string };

export type ParseInfoProps<T extends StrategyType> = {
  type: T;
  options?: ParseInfoOption[];
  formItemConfig?: Omit<FormItemProps, 'children'>;
  formCompConfig?: StrategyPropsType[T];
  component?: JSX.Element;
  dataType?: string;
};

/**
 * 表单工厂策略
 */
const strategy = {
  text: (props: any) => <Input className='Input' {...props} />,
  minitext: (props: any) => (
    <Input className={classnames('MiniInput', 'MarginLeft')} {...props} />
  ),
  textarea: (props: any) => <Input.TextArea {...props} />,
  radio: ({ options, ...props }: any) => (
    <Radio.Group {...props}>
      {options.map((o: any) => (
        <Radio value={o.value} key={o.value}>
          {o.content}
        </Radio>
      ))}
    </Radio.Group>
  ),
  select: ({ options, ...props }: any) => (
    <Select style={{ minWidth: 120 }} allowClear {...props}>
      {options.map((o: any) => (
        <Select.Option key={o.value} value={o.value}>
          {o.content}
        </Select.Option>
      ))}
    </Select>
  ),
  cascader: ({ options, ...props }: any) => (
    <Cascader style={{ minWidth: 120 }} options={options} {...props} />
  ),
  rangePicker: (props: any) => <RangePicker className='DatePicker' {...props} />,
  datePicker: (props: any) => <DatePicker className='DatePicker' {...props} />,
  timePicker: (props: any) => <TimePicker className='DatePicker' {...props} />,
  inputNumber: (props: any) => <InputNumber min={0} {...props} />,
  checkbox: ({ options, ...props }: any) => (
    <Checkbox.Group {...props}>
      {options.map((o: any) => (
        <Checkbox key={o.value} value={o.value}>
          {o.content}
        </Checkbox>
      ))}
    </Checkbox.Group>
  ),
  switch: (props: any) => <Switch {...props} />,
  treeSelect: (props: any) => <TreeSelect {...props} />,
  upload: (props: any) => (
    <Upload {...props}>
      {props.renderChildren ? (
        props.renderChildren(props)
      ) : (
        <div>
          <div className="ant-upload-text">Upload</div>
        </div>
      )}
    </Upload>
  ),
};

/** 所有支持类型 */
export type StrategyType = keyof typeof strategy;

/**
 * 表单工厂，快速生成表单
 */
export type FormFactoryProps = {
  /** 表单属性 继承自antd 4的FormProps */
  formProps?: FormProps;
  /** 表单描述属性 */
  materials: ParseInfoProps<any>[];
  /** 表单项额外数据 */
  children?: React.ReactNode;
};

/** 工厂组件，允许直接按照元素的方式生成页面 */
const FormFactory: React.ForwardRefRenderFunction<any, FormFactoryProps> = (props, ref) => {
  // form对象如果由外部传入，则form受外部控制
  const { formProps = {}, materials } = props;
  const { layout = 'horizontal' } = formProps;
  const formItemLayout =
    layout === 'horizontal'
      ? {
          labelCol: { span: 6 },
          wrapperCol: { span: 12 },
        }
      : null;
  return (
    <Form  {...formItemLayout} {...formProps} ref={ref}>
      {parseAll(materials)}
      {props.children}
    </Form>
  );
};

/** 表单工厂转发ref */
export default React.forwardRef(FormFactory);

/**
 * 根据传入数据生成Form.Item
 * @param material {ParseInfoProps<StrategyType>} Form的描述对象
 */
export function parse<T extends StrategyType>(material: ParseInfoProps<T>) {
  const { type, options = [], formItemConfig = {}, formCompConfig = {} } = material;
  const { isCascader, ...compConfig } = formCompConfig;
  let comp = null;
  const generator: any = strategy[type];
  comp = (
    <Form.Item
      // array key in diff
      key={JSON.stringify(material)}
      className='FlexRow'
      {...formItemConfig}
    >
      {generator({ ...compConfig, options })}
    </Form.Item>
  );
  return comp;
}

/**
 * 根据传入数据生成Form.Item列表
 * @param materials {ParseInfoProps<StrategyType>[]} Form的描述数组
 */
export function parseAll(materials: ParseInfoProps<any>[]) {
  if (!materials) return null;
  return materials.map(material => {
    if (!material?.type) return null;
    if (material.type === 'custom') return material?.component;
    return parse<typeof material.type>(material);
  });
}
