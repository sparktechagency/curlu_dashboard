import React from 'react';
import {
  useGetEarningQuery,
  useUpdateEarningMutation,
} from '../../Redux/Apis/platformCommiutionUpdate';
import { Card, Form, Input, Spin, Button, Typography } from 'antd';
import toast from 'react-hot-toast';

const { Title, Text } = Typography;

function EarningUpdate() {
  const { data: earningData, isLoading: earningDataLoading } =
    useGetEarningQuery();
  const [updateEarning, { isLoading: updateLoading }] =
    useUpdateEarningMutation();
  const [form] = Form.useForm();

  if (earningDataLoading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const initialValues = {
    earning: earningData?.data?.curlu_earning || 0,
  };

  const onFinish = async (values) => {
    try {
      const data = {
        curlu_earning: values.earning,
      };
      const res = await updateEarning({ data }).unwrap();
      if (res?.status) {
        toast.success(res?.message || 'Earning updated successfully!');
      }
      form.setFieldsValue({ earning: values.earning });
    } catch (error) {
      toast.error('Failed to update earning. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card
        style={{ width: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        bordered={false}
      >
        <Title
          level={3}
          style={{
            textAlign: 'center',
            marginBottom: 24,
            textTransform: 'uppercase',
          }}
        >
          Modify the Curlu Earning Commission
        </Title>
        <Form
          form={form}
          initialValues={initialValues}
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
        >
          <Form.Item
            label={<Text strong>Earning Commission</Text>}
            name="earning"
            rules={[
              { required: true, message: 'Please input the earning amount!' },
              {
                pattern: /^\d+(\.\d{1,2})?$/,
                message: 'Please enter a valid number (up to 2 decimals).',
              },
            ]}
          >
            <Input
              placeholder="Enter earning amount"
              type="number"
              step="0.01"
              min="0"
              style={{ fontSize: 16, padding: '10px 12px' }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="!bg-[#F27405] !text-white"
              htmlType="submit"
              block
              size="large"
              disabled={updateLoading}
            >
              {updateLoading ? <Spin size="small" /> : 'Save Changes'}
            </Button>
          </Form.Item>
        </Form>
        <Text
          type="secondary"
          style={{ fontSize: 12, display: 'block', textAlign: 'center' }}
        >
          Last updated:{' '}
          {new Date(earningData?.data?.updated_at).toLocaleString()}
        </Text>
      </Card>
    </div>
  );
}

export default EarningUpdate;
