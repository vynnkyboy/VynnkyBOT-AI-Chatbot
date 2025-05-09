module.exports = {
    theme: {
      extend: {
        keyframes: {
          blink: { '50%': { opacity: '0' } }
        },
        animation: {
          blink: 'blink 1s step-start infinite'
        }
      }
    }
  }
  