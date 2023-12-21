import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { SelectItem, Select, Switch, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
function App() {
  const [count, setCount] = useState(0)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = useState("auto");
  const [isSelected, setIsSelected] = useState(true);
  return (
    <NextUIProvider>
      <div className="block">
        <Switch isSelected={isSelected} onValueChange={setIsSelected} size="lg">
          Airplane mode
        </Switch>
        <p className="text-small text-default-500">Selected: {isSelected ? "true" : "false"}</p>
        <Button onPress={onOpen} className="max-w-fit">Open Modal</Button>
        <RadioGroup
          label="Select modal placement"
          orientation="horizontal"
          value={modalPlacement}
          onValueChange={setModalPlacement}
        >
          <Radio value="auto">auto</Radio>
          <Radio value="top">top</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="center">center</Radio>
          <Radio value="top-center">top-center</Radio>
          <Radio value="bottom-center">bottom-center</Radio>
        </RadioGroup>
        <Select
          label="Favorite Animal"
          placeholder="Select an animal"
          className="max-w-xs"
        >
          <SelectItem>1</SelectItem>
          <SelectItem>2</SelectItem>
          <SelectItem>3</SelectItem>
        </Select>
        <Modal
          isOpen={isOpen}
          placement={modalPlacement}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </NextUIProvider>
  )
}

export default App
