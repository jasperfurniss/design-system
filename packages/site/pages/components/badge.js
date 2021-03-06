import React from 'react'
import Badge from '@pluralsight/ps-design-system-badge/react'

import {
  Chrome,
  Code,
  Content,
  Example,
  P,
  PageHeading,
  PropTypes,
  SectionHeading,
  withServerProps
} from '../../src/ui'

export default withServerProps(_ => (
  <Chrome>
    <Content title="Badge">
      <PageHeading packageName="badge">Badge</PageHeading>

      <P>Install the component dependency:</P>
      <Code language="bash">
        npm install @pluralsight/ps-design-system-badge
      </Code>

      <P>Include a React component in your project:</P>
      <Code language="javascript">
        import Badge from '@pluralsight/ps-design-system-badge/react'
      </Code>

      <PropTypes
        title="PropTypes"
        props={[
          PropTypes.row([
            'appearance',
            PropTypes.union(Badge.appearances),
            null,
            <code>default</code>,
            <span>
              visual style (from <code>Badge.appearances</code>)
            </span>
          ]),
          PropTypes.row([
            'color',
            PropTypes.union(Badge.colors),
            null,
            <code>gray</code>,
            <span>
              badge color (from <code>Badge.colors</code>)
            </span>
          ])
        ]}
      />

      <SectionHeading>Appearance</SectionHeading>
      <P>
        In either solid or stroked styles. The stroke appearance should not be
        used with the light theme
      </P>
      <Example.React
        includes={{ Badge }}
        codes={Object.values(Badge.appearances).map(
          a => `<Badge appearance={Badge.appearances.${a}}>Badge</Badge>`
        )}
      />

      <SectionHeading>Colors</SectionHeading>
      <P>Colors come from the Design System. Semantics come from your heart.</P>
      <Example.React
        includes={{ Badge }}
        themeToggle
        orient="vertical"
        codes={Object.values(Badge.colors).map(
          color => `<Badge color={Badge.colors.${color}}>Badge</Badge>`
        )}
      />
    </Content>
  </Chrome>
))
