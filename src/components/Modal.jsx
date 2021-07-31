import {
  Button, Checkbox, Grid, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/react"
import React from 'react'


function ModalComponent({tweet,onClose,setWords,onSave}) {
  return (
    <>
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="#FFF" color="#000">
        <ModalHeader>Choose The Words</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Grid templateColumns="repeat(4, 1fr)" gap={2}>
          {
            tweet.trim().split(' ').map((word,idx)=> word.trim() && <Checkbox 
            key={word + idx}
              onChange={(e)=> e.target.checked ? setWords(prev=> [...prev,word]) :
                 setWords((prev)=> prev.filter(w=> w !== word)) }
            colorScheme="green">
            {word}
          </Checkbox>)
          }
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={onSave} colorScheme="green">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default ModalComponent
