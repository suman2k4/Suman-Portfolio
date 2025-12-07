import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function TypewriterTerminal({ lines }) {
  const [displayed, setDisplayed] = useState([])

  useEffect(() => {
    setDisplayed([])
    let timeout
    let index = 0
    const reveal = () => {
      if (index < lines.length) {
        setDisplayed((prev) => [...prev, lines[index]])
        index += 1
        timeout = setTimeout(reveal, 600)
      }
    }
    timeout = setTimeout(reveal, 100)
    return () => clearTimeout(timeout)
  }, [lines])

  return (
    <div className="terminal-block text-stCream/80">
      <div className="theme-text-status mb-2">{'>'} STATUS :: ONLINE</div>
      {displayed.map((line, idx) => (
        <p key={line + idx} className="pb-1">
          <span className="text-stBlue">$</span> {line}
        </p>)
      )}
    </div>
  )
}

TypewriterTerminal.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.string).isRequired
}
