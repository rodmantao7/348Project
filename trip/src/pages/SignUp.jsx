import Title from "../components/Title"
import { useNavigate } from "react-router-dom"
import { Form, Toast, Button } from "@douyinfe/semi-ui"

export default function Login() {
  const navigate = useNavigate()
  const handleSubmit = (values) => {
    fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if(response.status === 201){
          Toast.success("sign up success")
          navigate("/login")
        }else{
          Toast.error("error")
        }
        return response.json()
      })
      .then((data) => {
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <section className="flex justify-center flex-col items-center h-full">
      <Title />
      <Form
        onSubmit={(values) => handleSubmit(values)}
        style={{ width: 400 }}
        className="mt-4"
        trigger="blur"
      >
        {({ formState, values, formApi }) => (
          <>
            <Form.Input
              field="email"
              label="Enter your email"
              style={{ width: "100%" }}
              autoComplete="off"
              size="large"
              rules={[
                {
                  validator: (rule, value) =>
                    RegExp(
                      "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
                    ).test(value),
                  message: "invalid email address",
                },
              ]}
            ></Form.Input>
            <Form.Input
              field="username"
              label="Enter your username"
              style={{ width: "100%" }}
              autoComplete="off"
              size="large"
            ></Form.Input>
            <Form.Input
              field="first_name"
              label="Enter your First Name"
              style={{ width: "100%" }}
              autoComplete="off"
              size="large"
            ></Form.Input>
            <Form.Input
              field="last_name"
              label="Enter your Last Name"
              style={{ width: "100%" }}
              autoComplete="off"
              size="large"
            ></Form.Input>
            <Form.Input
              field="password"
              label="Enter your Password"
              style={{ width: "100%" }}
              autoComplete="off"
              size="large"
            ></Form.Input>
            <div className="flex justify-between flex-col items-center h-100px mt-4">
              <Button
                htmlType="submit"
                type="primary"
                className="block"
                theme="solid"
                size="large"
              >
                Sign Up
              </Button>
            </div>
          </>
        )}
      </Form>
    </section>
  )
}
