'use client'

import { useState, useEffect } from 'react'

const useTypewriter = ({
  words = ['Hello', 'World'],
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseTime = 2000,
  initialDelay = 0,
  cycleDelay = 2000,
} = {}) => {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) {
      const timer = setTimeout(() => {
        setHasStarted(true)
      }, initialDelay)
      return () => clearTimeout(timer)
    }

    const currentWord = words[wordIndex % words.length]
    let timer

    if (!isDeleting) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1))
      }, typingSpeed)
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1))
      }, deletingSpeed)
    }

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
    }

    if (isDeleting && text === '') {
      timer = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((prev) => prev + 1)
      }, cycleDelay)
    }

    return () => clearTimeout(timer)
  }, [
    text,
    isDeleting,
    wordIndex,
    hasStarted,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
    initialDelay,
    cycleDelay,
  ])

  return text
}

export default useTypewriter
