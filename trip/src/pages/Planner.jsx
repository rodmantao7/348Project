import Title from "../components/Title"
import { Form, Button, Collapse, Space, Toast } from "@douyinfe/semi-ui"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Planner() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])
  const [folders, setFolders] = useState([])
  const [source, setSource] = useState(null)
  const logout = () => {
    fetch("/api/user/logout", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        AUTHORIZATION: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 201) {
          Toast.success("logout success")
          localStorage.setItem("token", "")
          navigate("/login")
        } else {
          Toast.error("error")
        }
        return response.json()
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err.message)
      })
  }

  const getAllTrips = () => {
    fetch("/api/trip", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        AUTHORIZATION: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
        } else {
          Toast.error("error")
        }
        return response.json()
      })
      .then((data) => {
        setTrips(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const getAllFolders = () => {
    fetch("/api/folder", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        AUTHORIZATION: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
        } else {
          Toast.error("error")
        }
        return response.json()
      })
      .then((data) => {
        setFolders(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleSubmit = (values) => {
    fetch("/api/trip", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        AUTHORIZATION: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 201) {
          Toast.success("create trip success")
          getAllTrips()
        } else {
          Toast.error("error")
        }
        return response.json()
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err.message)
      })
  }

  const createFolder = () => {
    fetch("/api/folder", {
      method: "POST",
      body: JSON.stringify({
        name: new Date().getMilliseconds(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        AUTHORIZATION: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 201) {
          Toast.success("create folder success")
          getAllFolders()
        } else {
          Toast.error("error")
        }
        return response.json()
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err.message)
      })
  }

  const moveCopyTrip = (id,values) => {
    fetch(`/api/folder/${id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        AUTHORIZATION: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          getAllFolders()
        } else {
          Toast.error("error")
        }
        return response.json()
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    const isLogin = localStorage.getItem("token")
    if (!isLogin) {
      navigator("/login")
    }
  })
  useEffect(() => {
    getAllTrips()
    getAllFolders()
  }, [])
  const clearDropStyle = () => {
    document.querySelectorAll(".border-4").forEach((node) => {
      node.classList.remove("border-4")
      node.classList.remove("border-dashed")
      node.classList.remove("border-green-500")
    })
  }
  const getDropNode = (node) => {
    while (node) {
      if (node.dataset?.drop) {
        return node
      }
      node = node.parentNode
    }
  }
  const getParentNode = (node) => {
    while (node) {
      if (node.dataset?.id) {
        return node
      }
      node = node.parentNode
    }
  }
  return (
    <div className="py-4">
      <div className="grid" style={{ gridTemplateColumns: "400px 1fr" }}>
        <Title title="Login" />
        <div className="flex flex-justify-end items-center p-4">
          <Button
            type="primary"
            className="block"
            theme="solid"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </div>
      </div>
      <div
        className="grid grid-cols-3 gap-2 mt-8"
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = e.target.dataset.effect
          setSource(e.target)
        }}
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDragEnter={(e) => {
          clearDropStyle()
          const dropNode = getDropNode(e.target)
          if (
            dropNode &&
            dropNode.dataset.drop === e.dataTransfer.effectAllowed
          ) {
            e.target.classList.add("border-4")
            e.target.classList.add("border-green-500")
            e.target.classList.add("border-dashed")
          }
        }}
        onDrop={(e) => {
          clearDropStyle()
          const dropNode = getDropNode(e.target)
          if (
            dropNode &&
            dropNode.dataset.drop === e.dataTransfer.effectAllowed
          ) {
            if (dropNode.dataset.drop === "copy") {
              moveCopyTrip(dropNode.dataset.id, {
                drop: "copy",
                trip: source.dataset.id,
              })
            } else {
              moveCopyTrip(getParentNode(source.parentNode).dataset.id, {
                drop: "move",
                trip: source.dataset.id,
              })
            }
          }
        }}
      >
        <div className="bg-gray-2">
          <h2 className="p-4">TRIPS </h2>
          <Collapse id="container1">
            {trips.map((trip, index) => {
              return (
                <Collapse.Panel
                  header={`Trip ${index + 1}`}
                  itemKey={`${index}`}
                  draggable="true"
                  data-effect="copy"
                  data-drop="move"
                  data-id={trip.tripId}
                >
                  <ul className="text-left px-4">
                    <li>origin: {trip.origin}</li>
                    <li>destination: {trip.destination}</li>
                    <li>price: {trip.price}</li>
                    <li>distance: {trip.distance}</li>
                    <li>departure_date: {trip.departure_date}</li>
                    <li>return_date: {trip.return_date}</li>
                  </ul>
                </Collapse.Panel>
              )
            })}
          </Collapse>
        </div>
        <div className="h-full px-8 py-2">
          <Form onSubmit={(values) => handleSubmit(values)}>
            {({ formState, values, formApi }) => (
              <>
                <Form.Input
                  field="origin"
                  label="Enter origin:"
                  style={{ width: "100%" }}
                  autoComplete="off"
                ></Form.Input>
                <Form.Input
                  field="destination"
                  label="Enter destination:"
                  style={{ width: "100%" }}
                  autoComplete="off"
                ></Form.Input>
                <Form.Input
                  field="price"
                  label="Enter price:"
                  style={{ width: "100%" }}
                  autoComplete="off"
                ></Form.Input>
                <Form.Input
                  field="distance"
                  label="Enter distance:"
                  style={{ width: "100%" }}
                  autoComplete="off"
                ></Form.Input>
                <Form.DatePicker
                  field="departure_date"
                  label="departure_date"
                  style={{ width: "100%" }}
                  placeholder="Select departure date"
                />
                <Form.DatePicker
                  field="return_date"
                  label="return_date"
                  style={{ width: "100%" }}
                  placeholder="Select return date"
                  rules={[
                    {
                      validator: (rule, value) => value > values['departure_date'],
                      message: "return date must be after departure date",
                    },
                  ]}
                />
                {/* <Form.Input
                  field="departure_date"
                  label="Enter departure date:"
                  style={{ width: "100%" }}
                  autoComplete="off"
                ></Form.Input>
                <Form.Input
                  field="return_date"
                  label="Enter return date:"
                  style={{ width: "100%" }}
                  autoComplete="off"
                ></Form.Input> */}
                <div className="flex justify-between flex-col items-center">
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="block"
                    theme="solid"
                  >
                    Create
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
        <div className="bg-gray-2 px-4">
          <div className="flex justify-end items-center py-2">
            <Button
              htmlType="submit"
              type="primary"
              className="block"
              theme="solid"
              size="small"
              onClick={() => createFolder()}
            >
              create a folder
            </Button>
          </div>
          <Space vertical className="w-full" align="baseline" spacing="medium">
            {folders.map((folder, index) => {
              return (
                <Collapse
                  className="w-full bg-folder"
                  data-drop="copy"
                  data-id={folder.folderId}
                >
                  <Collapse.Panel
                    header={`folder ${index + 1}`}
                    itemKey={`${index}`}
                  >
                    <Collapse>
                      {folder.trips.map((trip, _index) => {
                        return (
                          <Collapse.Panel
                            header={`Trip ${_index + 1}`}
                            itemKey={`${_index}`}
                            draggable="true"
                            data-effect="move"
                            data-drop="drop"
                            data-id={trip.tripId}
                          >
                            <ul className="text-left px-4">
                              <li>origin: {trip.origin}</li>
                              <li>destination: {trip.destination}</li>
                              <li>price: {trip.price}</li>
                              <li>distance: {trip.distance}</li>
                              <li>departure_date: {trip.departure_date}</li>
                              <li>return_date: {trip.return_date}</li>
                            </ul>
                          </Collapse.Panel>
                        )
                      })}
                    </Collapse>
                  </Collapse.Panel>
                </Collapse>
              )
            })}
          </Space>
        </div>
      </div>
    </div>
  )
}
