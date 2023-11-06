import Title from "../components/Title"
import { useNavigate } from "react-router-dom"
import { Form, Toast, Button } from "@douyinfe/semi-ui"

export default function Login() {
  const navigate = useNavigate()
  const isLogin = localStorage.getItem("token")
  if (isLogin) {
    navigate("/planner")
  }
  const handleSubmit = (values) => {
    fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          Toast.error("error")
        }else{
          Toast.success("login success")
        }
        return response.json()
      })
      .then((data) => {
        if(data.token){
          localStorage.setItem("token", data.token)
          navigate("/planner")
        }
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
      >
        {({ formState, values, formApi }) => (
          <>
            <Form.Input
              field="username"
              label="Username or email"
              style={{ width: "100%" }}
              autoComplete="off"
              size="large"
            ></Form.Input>
            <Form.Input
              field="password"
              label="Password"
              style={{ width: "100%" }}
              autoComplete="off"
              size="large"
            ></Form.Input>
            <div className="flex justify-between flex-col items-center h-100px mt-8">
              <Button
                htmlType="submit"
                type="primary"
                className="block w-160px"
                theme="solid"
                size="large"
              >
                Login
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                className="block w-160px"
                theme="solid"
                size="large"
                onClick={() => navigate('/signup')}
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
