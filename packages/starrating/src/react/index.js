import * as glamor from 'glamor'
import PropTypes from 'prop-types'
import React from 'react'

import { names as themeNames } from '@pluralsight/ps-design-system-theme/vars'
import { withTheme } from '@pluralsight/ps-design-system-theme/react'

import Star from './star'

import css, { BASE_CLASSNAME } from '../css'

const styles = {
  starRating: () => glamor.css(css[BASE_CLASSNAME]),
  screenReaderInput: () =>
    glamor.css(css[`${BASE_CLASSNAME}__screen-reader-input`]),
  screenReaderText: () =>
    glamor.css(css[`${BASE_CLASSNAME}__screen-reader-text`])
}

const ScreenReaderInput = props => (
  <input {...styles.screenReaderInput(props)} tabIndex={-1} {...props} />
)

const ScreenReaderText = props => (
  <span {...styles.screenReaderText(props)} {...props} />
)

class StarRating extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleStarClicked = this.handleStarClicked.bind(this)
    this.handleStarEnter = this.handleStarEnter.bind(this)
    this.handleStarLeave = this.handleStarLeave.bind(this)

    this.state = { hoverIndex: null }
  }

  handleInputChanged(event) {
    if (!this.isInteractive) return
    this.props.onChange(event.target.value, event)
  }

  handleStarClicked(index, event) {
    if (!this.isInteractive) return
    this.props.onChange(index + 1, event)
  }

  handleStarEnter(index, event) {
    if (!this.isInteractive) return
    this.setState(() => ({ hoverIndex: index }))
  }

  handleStarLeave(index, event) {
    if (!this.isInteractive) return
    this.setState(() => ({ hoverIndex: null }))
  }

  get isInteractive() {
    return !!this.props.onChange
  }

  get stars() {
    const { hoverIndex } = this.state
    const { starCount, value } = this.props

    const hasValidRating = !Number.isNaN(parseFloat(value))
    const isHovering = hoverIndex !== null

    const valueRounded = Math.floor(value * 2) / 2
    const fullStars = Math.floor(valueRounded)
    const halfStars = Math.floor(valueRounded) !== valueRounded

    return [...Array(starCount)].map((_, index) => {
      let active = false
      let bright = false
      let appearance

      if (isHovering) {
        if (index <= hoverIndex) {
          active = true
          appearance = Star.appearances.full
        } else {
          appearance = Star.appearances.empty
        }
      } else {
        if (this.isInteractive && !hasValidRating) {
          appearance = Star.appearances.empty
          bright = true
        } else if (index < fullStars) {
          active = true
          appearance = Star.appearances.full
        } else if (index === fullStars && halfStars) {
          active = true
          appearance = Star.appearances.half
        } else {
          appearance = Star.appearances.full
        }
      }

      return (
        <Star
          active={active}
          appearance={appearance}
          bright={bright}
          index={index}
          interactive={this.isInteractive}
          key={index}
          onClick={this.handleStarClicked}
          onEnter={this.handleStarEnter}
          onLeave={this.handleStarLeave}
        />
      )
    })
  }

  render() {
    const { starCount, value } = this.props

    return (
      <div {...styles.starRating(this.props)}>
        {this.isInteractive && (
          <label>
            <ScreenReaderText>Rate</ScreenReaderText>
            <ScreenReaderInput
              type="range"
              onChange={this.handleInputChanged}
              min={1}
              max={starCount}
              step={1}
              value={value || 0}
            />
          </label>
        )}

        {this.stars}

        <ScreenReaderText>This is rated {value}</ScreenReaderText>
      </div>
    )
  }
}

StarRating.propTypes = {
  onChange: PropTypes.func,
  starCount: PropTypes.number,
  themeName: PropTypes.oneOf(Object.keys(themeNames)).isRequired,
  value: PropTypes.number
}

StarRating.defaultProps = {
  starCount: 5
}

export default withTheme(StarRating)
