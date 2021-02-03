/* eslint-disable no-template-curly-in-string */
/*
 * NOTE: This class is auto generated by /wakamsha/learn-react/packages/catalog
 * Do not edit the class manually.
 */

export const storySpec = {
  'core/components/dataDisplay/Icon':
    "import { css } from '@emotion/css';\nimport { IconName, iconElements } from '@learn-react/icon';\nimport { FontSize } from '../../../constants/Style';\nimport { gutter, square } from '../../../helpers/Style';\nimport { Icon } from '.';\n\nexport const Story = () => (\n  <ul className={styleBase}>\n    {Object.keys(iconElements).map(iconName => (\n      <li key={iconName}>\n        <Icon name={iconName as IconName} />\n        <span>{iconName}</span>\n      </li>\n    ))}\n  </ul>\n);\n\nconst styleBase = css`\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n\n  > li {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: space-between;\n    margin: 0 ${gutter(4)} ${gutter(16)};\n    ${square(96)}\n\n    > svg {\n      ${square(64)}\n    }\n\n    > span {\n      font-size: ${FontSize.Small};\n    }\n  }\n`;\n",
  'core/components/dataDisplay/Tooltip':
    'import { css } from \'@emotion/css\';\nimport { useState } from \'react\';\nimport { gutter, square } from \'../../../helpers/Style\';\nimport { Button } from \'../../inputs/Button\';\nimport { Checkbox } from \'../../inputs/Checkbox\';\nimport { Icon } from \'../Icon\';\nimport { Tooltip } from \'.\';\n\nexport const Story = () => {\n  const [disabled, setDisabled] = useState(false);\n  const handleChangeDisabled = () => setDisabled(b => !b);\n\n  return (\n    <>\n      <Checkbox.Label label="Disabled">\n        <Checkbox checked={disabled} onChange={handleChangeDisabled} />\n      </Checkbox.Label>\n\n      <hr />\n\n      <div className={styleRow}>\n        <Button id="review-button" disabled={disabled}>\n          新規レビュー\n        </Button>\n      </div>\n      <div className={styleRow}>\n        <span className={styleIcon} id="trash-icon">\n          <Icon name="trash" />\n        </span>\n        <span className={styleIcon} id="download-icon">\n          <Icon name="download" />\n        </span>\n      </div>\n      <div className={styleRow}>\n        <Button id="button-top">上に出ます</Button>\n      </div>\n      <div className={styleRow}>\n        <Button id="button-right-top">上に出ます ( Right / Top )</Button>\n      </div>\n      <div className={styleRow}>\n        <Button id="button-left-bottom">下に出ます ( Left / Bottom )</Button>\n      </div>\n\n      <Tooltip targetSelector="#review-button">\n        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら\n      </Tooltip>\n\n      <Tooltip targetSelector="#trash-icon">削除します</Tooltip>\n\n      <Tooltip targetSelector="#download-icon">ダウンロード</Tooltip>\n\n      <Tooltip targetSelector="#button-top" position="top">\n        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら\n      </Tooltip>\n\n      <Tooltip targetSelector="#button-right-top" position="top" alignment="end">\n        すきとおった風\n      </Tooltip>\n\n      <Tooltip targetSelector="#button-left-bottom" position="bottom" alignment="start" offset={10}>\n        すきとおった風\n      </Tooltip>\n    </>\n  );\n};\n\nconst styleRow = css`\n  & + & {\n    margin-top: ${gutter(4)};\n  }\n`;\n\nconst styleIcon = css`\n  display: inline-block;\n  margin: 0 ${gutter(2)};\n\n  > svg {\n    ${square(48)}\n  }\n`;\n',
  'core/components/feedback/Toast':
    "import { css } from '@emotion/css';\nimport { ChangeEvent, FormEvent, useState } from 'react';\nimport { gutter } from '../../../helpers/Style';\nimport { ToastProvider, useToast } from '.';\n\nexport const Story = () => (\n  <ToastProvider>\n    <AddMessage />\n  </ToastProvider>\n);\n\nconst AddMessage = () => {\n  const { addToast } = useToast();\n\n  const [value, setValue] = useState('');\n\n  const [theme, setTheme] = useState<'primary' | 'danger'>('primary');\n\n  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);\n\n  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTheme(e.target.value as 'primary' | 'danger');\n\n  const handleSubmit = (e: FormEvent) => {\n    e.preventDefault();\n    addToast({ content: value || 'Hello World!', theme });\n    setValue('');\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input className={styleInput} value={value} onChange={handleInput} placeholder=\"メッセージを入力してください\" />\n      <ul>\n        {['primary', 'danger'].map(label => (\n          <li key={label}>\n            <label>\n              <input type=\"radio\" value={label} name=\"theme\" checked={label === theme} onChange={handleChange} />\n              {label}\n            </label>\n          </li>\n        ))}\n      </ul>\n    </form>\n  );\n};\n\nconst styleInput = css`\n  display: block;\n  width: 100%;\n  padding: ${gutter(1)};\n`;\n",
  'core/components/inputs/Button':
    "import { css } from '@emotion/css';\nimport { gutter } from '../../../helpers/Style';\nimport { Icon } from '../../dataDisplay/Icon';\nimport { Button } from '.';\n\nconst themes = ['primary', 'danger'] as const;\n\nexport const Story = () => (\n  <>\n    <h3>Solid</h3>\n    <div className={styleRow}>\n      {themes.map(theme => (\n        <div key={theme} className={styleCell}>\n          <Button theme={theme}>{theme}</Button>\n        </div>\n      ))}\n      <div className={styleCell}>\n        <Button disabled>disabled</Button>\n      </div>\n    </div>\n\n    <h3>Ghost</h3>\n    <div className={styleRow}>\n      {themes.map(theme => (\n        <div key={theme} className={styleCell}>\n          <Button variant=\"ghost\" theme={theme}>\n            {theme}\n          </Button>\n        </div>\n      ))}\n      <div className={styleCell}>\n        <Button variant=\"ghost\" disabled>\n          disabled\n        </Button>\n      </div>\n    </div>\n\n    <h3>Bare</h3>\n    <div className={styleRow}>\n      {themes.map(theme => (\n        <div key={theme} className={styleCell}>\n          <Button variant=\"bare\" theme={theme}>\n            {theme}\n          </Button>\n        </div>\n      ))}\n      <div className={styleCell}>\n        <Button variant=\"bare\" disabled>\n          disabled\n        </Button>\n      </div>\n    </div>\n\n    <h3>With Icon</h3>\n    <div className={styleRow}>\n      {(['solid', 'ghost', 'bare'] as const).map(variant => (\n        <div key={variant} className={styleCell}>\n          <Button variant={variant}>\n            <Icon name=\"plus\" />\n            {variant}\n          </Button>\n        </div>\n      ))}\n    </div>\n    <div className={styleRow}>\n      {(['solid', 'ghost', 'bare'] as const).map(variant => (\n        <div key={variant} className={styleCell}>\n          <Button variant={variant}>\n            {variant}\n            <Icon name=\"plus\" />\n          </Button>\n        </div>\n      ))}\n    </div>\n\n    <h3>Block</h3>\n    <div className={styleCell}>\n      <Button block>Solid</Button>\n    </div>\n    <div className={styleCell}>\n      <Button variant=\"ghost\" block>\n        Ghost\n      </Button>\n    </div>\n\n    <h3>Noop</h3>\n    <div className={styleRow}>\n      <div className={styleCell}>\n        <Button noop>Solid</Button>\n      </div>\n      <div className={styleCell}>\n        <Button variant=\"ghost\" noop>\n          Ghost\n        </Button>\n      </div>\n      <div className={styleCell}>\n        <Button variant=\"bare\" noop>\n          disabled\n        </Button>\n      </div>\n      <div className={styleCell}>\n        <Button noop disabled>\n          disabled\n        </Button>\n      </div>\n    </div>\n  </>\n);\n\nconst styleRow = css`\n  display: flex;\n  flex-wrap: wrap;\n`;\n\nconst styleCell = css`\n  padding: ${gutter(1)};\n`;\n",
  'core/components/inputs/Calendar':
    "import { useState } from 'react';\nimport { Calendar } from '.';\n\nexport const Story = () => {\n  const [date, setDate] = useState(new Date());\n\n  const [month, setMonth] = useState(new Date());\n\n  const handleClickDate = (date: Date) => setDate(date);\n\n  const handleClickMonth = (date: Date) => setMonth(date);\n\n  return (\n    <Calendar\n      value={date}\n      page={month}\n      maxDate={new Date()}\n      minDate={new Date(2020, 0, 10)}\n      onClickDate={handleClickDate}\n      onClickPrevMonth={handleClickMonth}\n      onClickNextMonth={handleClickMonth}\n    />\n  );\n};\n",
  'core/components/inputs/Checkbox':
    'import { useState } from \'react\';\nimport { Checkbox } from \'.\';\n\nexport const Story = () => {\n  const [checked1, setChecked1] = useState(false);\n\n  const [checked2, setChecked2] = useState(false);\n\n  const [indeterminate, setIndeterminate] = useState(false);\n\n  const handleChange1 = () => setChecked1(v => !v);\n\n  const handleChange2 = () => setChecked2(v => !v);\n\n  const handleChangeIndeterminate = () => setIndeterminate(v => !v);\n\n  return (\n    <ul>\n      <li>\n        <Checkbox checked={checked1} onChange={handleChange1} />\n      </li>\n      <li>\n        <Checkbox.Label label="Checkbox">\n          <Checkbox checked={checked2} onChange={handleChange2} />\n        </Checkbox.Label>\n      </li>\n      <li>\n        <Checkbox.Label label="Switch to indeterminate">\n          <Checkbox onChange={handleChangeIndeterminate} checked={indeterminate} />\n        </Checkbox.Label>\n      </li>\n      <li>\n        <Checkbox indeterminate={indeterminate} />\n      </li>\n      <li>\n        <Checkbox disabled />\n      </li>\n      <li>\n        <Checkbox disabled checked />\n      </li>\n    </ul>\n  );\n};\n',
  'core/components/inputs/IconButton':
    'import { css } from \'@emotion/css\';\nimport { gutter } from \'../../../helpers/Style\';\nimport { IconButton } from \'.\';\n\nexport const Story = () => (\n  <>\n    <h3>Solid</h3>\n    <div className={styleRow}>\n      <IconButton name="plus" />\n      <IconButton name="plus" theme="danger" />\n      <IconButton name="plus" disabled />\n    </div>\n\n    <h3>Ghost</h3>\n    <div className={styleRow}>\n      <IconButton name="plus" variant="ghost" />\n      <IconButton name="plus" variant="ghost" theme="danger" />\n      <IconButton name="plus" variant="ghost" disabled />\n    </div>\n\n    <h3>Bare</h3>\n    <div className={styleRow}>\n      <IconButton name="plus" variant="bare" />\n      <IconButton name="plus" variant="bare" theme="danger" />\n      <IconButton name="plus" variant="bare" disabled />\n    </div>\n\n    <h3>Size</h3>\n    <div className={styleRow}>\n      <IconButton name="plus" />\n      <IconButton name="plus" size="small" />\n    </div>\n    <div className={styleRow}>\n      <IconButton name="plus" variant="ghost" />\n      <IconButton name="plus" variant="ghost" size="small" />\n    </div>\n    <div className={styleRow}>\n      <IconButton name="plus" variant="bare" />\n      <IconButton name="plus" variant="bare" size="small" />\n    </div>\n  </>\n);\n\nconst styleRow = css`\n  & + & {\n    margin-top: ${gutter(4)};\n  }\n\n  > :not(:first-child) {\n    margin-left: ${gutter(6)};\n  }\n`;\n',
  'core/components/inputs/LabeledSlider':
    'import { useCallback, useMemo, useState } from \'react\';\nimport { LabeledSlider } from \'.\';\n\nexport const Story = () => {\n  const [weight, setWeight] = useState(60);\n  const [height, setHeight] = useState(170);\n\n  const handleWeightChange = useCallback((w: string) => setWeight(Number(w)), []);\n  const handleHeightChange = useCallback((h: string) => setHeight(Number(h)), []);\n\n  const calcBMI = useMemo(() => {\n    const heightMeters = height * 0.01;\n\n    return Math.round(weight / (heightMeters * heightMeters));\n  }, [weight, height]);\n\n  return (\n    <>\n      <LabeledSlider label="Weight" unit="kg" min={40} max={150} value={weight} onValueChange={handleWeightChange} />\n      <LabeledSlider label="Height" unit="cm" min={140} max={220} value={height} onValueChange={handleHeightChange} />\n      <p>BMI: {calcBMI}</p>\n    </>\n  );\n};\n',
  'core/components/inputs/Radio':
    'import { ChangeEvent, useState } from \'react\';\nimport { Radio } from \'.\';\n\nexport const Story = () => {\n  const [value, setValue] = useState(\'\');\n\n  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setValue(value);\n\n  return (\n    <ul>\n      <li>\n        <Radio name="radio-group" value="foo" checked={value === \'foo\'} onChange={handleChange} />\n      </li>\n      <li>\n        <Radio.Label label="Radio Button 1">\n          <Radio name="radio-group" value="bar" checked={value === \'bar\'} onChange={handleChange} />\n        </Radio.Label>\n      </li>\n      <li>\n        <Radio.Label label="Radio Button 2">\n          <Radio name="radio-group" value="baz" checked={value === \'baz\'} onChange={handleChange} />\n        </Radio.Label>\n      </li>\n      <li>\n        <Radio.Label label="Radio Button 3">\n          <Radio name="radio-group" value="lorem" checked={value === \'lorem\'} disabled />\n        </Radio.Label>\n      </li>\n    </ul>\n  );\n};\n',
  'core/components/inputs/Range':
    'import { useState } from \'react\';\nimport { Range } from \'.\';\n\nexport const Story = () => {\n  const [value, setValue] = useState(50);\n\n  return (\n    <>\n      <h3>Basic</h3>\n      <Range value={value} onChange={setValue} step={0.5} />\n      <p>\n        Value: <b>{value}</b>\n      </p>\n      <h3>Theme</h3>\n      <Range value={50} onChange={console.info} theme="primary" />\n      <Range value={50} onChange={console.info} theme="danger" />\n    </>\n  );\n};\n',
  'core/components/inputs/Select':
    "import { useState } from 'react';\nimport { Select } from '.';\n\nexport const Story = () => {\n  const options = [\n    {\n      label: 'Apple',\n      value: 'りんご',\n    },\n    {\n      label: 'Banana',\n      value: 'バナナ',\n    },\n    {\n      label: 'Orange',\n      value: 'みかん',\n    },\n  ];\n\n  const optGroups = [\n    {\n      id: 'foo',\n      label: 'Theropods',\n      options: [\n        {\n          label: 'Tyrannosaurus',\n          value: 'Tyrannosaurus',\n        },\n        { label: 'Velociraptor', value: 'Velociraptor' },\n        { label: 'Deinonychus', value: 'Deinonychus' },\n      ],\n    },\n    {\n      id: 'bar',\n      label: 'Sauropods',\n      options: [\n        { label: 'Diplodocus', value: 'Diplodocus' },\n        { label: 'Saltasaurus', value: 'Saltasaurus' },\n        { label: 'Apatosaurus', value: 'Apatosaurus' },\n      ],\n    },\n  ];\n\n  const [state1, setState1] = useState(options[0].value);\n\n  const [state2, setState2] = useState(optGroups[0].options[0].value);\n\n  const handleChange1 = ({ value }: { value: string }) => setState1(value);\n\n  const handleChange2 = ({ value }: { value: string }) => setState2(value);\n\n  return (\n    <>\n      <h3>Basic</h3>\n      <Select options={options} value={state1} onChange={handleChange1} icon=\"list\" />\n      <pre>\n        <code>{JSON.stringify({ value: state1 }, null, 2)}</code>\n      </pre>\n      <h3>Use Optgroup</h3>\n      <Select optGroups={optGroups} value={state2} onChange={handleChange2} />\n      <pre>\n        <code>{JSON.stringify({ value: state2 }, null, 2)}</code>\n      </pre>\n    </>\n  );\n};\n",
  'core/components/inputs/TextField':
    'import { css } from \'@emotion/css\';\nimport { useState } from \'react\';\nimport { gutter } from \'../../../helpers/Style\';\nimport { TextField } from \'.\';\n\nexport const Story = () => {\n  const [value, setValue] = useState(\'hello world\');\n\n  return (\n    <>\n      <h3>Basic</h3>\n      <TextField value={value} onChange={setValue} placeholder="Input something..." />\n\n      <h3>With Clear button</h3>\n      <TextField value={value} onChange={setValue} placeholder="Input something..." clearable />\n\n      <h3>Variant</h3>\n      <div className={styleRow}>\n        <TextField value={value} onChange={setValue} placeholder="text" type="text" />\n        <TextField value={value} onChange={setValue} placeholder="email" type="email" />\n        <TextField value={value} onChange={setValue} placeholder="password" type="password" />\n        <TextField value={value} onChange={setValue} placeholder="search" type="search" icon="search" />\n        <TextField value={value} onChange={setValue} placeholder="tel" type="tel" />\n        <TextField value={value} onChange={setValue} placeholder="url" type="url" />\n        <TextField value={value} onChange={setValue} placeholder="number" type="number" />\n      </div>\n\n      <h3>Disabled</h3>\n      <TextField value={value} onChange={setValue} placeholder="Input something..." clearable disabled />\n    </>\n  );\n};\n\nconst styleRow = css`\n  > :not(:first-child) {\n    margin-top: ${gutter(4)};\n  }\n`;\n',
  'core/components/navigation/Tabs':
    "import { useState } from 'react';\nimport { Tabs } from '.';\n\nconst options = [\n  {\n    label: 'ITEM ONE',\n    value: 1,\n  },\n  {\n    label: 'ITEM TWO',\n    value: 2,\n  },\n  {\n    label: 'ITEM THREE',\n    value: 3,\n  },\n];\n\nexport const Story = () => {\n  const [state, setState] = useState(1);\n\n  const handleChange = ({ value }: { value: number }) => setState(value);\n\n  return (\n    <>\n      <h3>Basic</h3>\n      <p>\n        Current state: <code>{state}</code>\n      </p>\n      <Tabs options={options} value={state} onChange={handleChange} />\n\n      <h3>Sizes</h3>\n      <Tabs options={options} value={1} onChange={console.info} />\n      <Tabs options={options} value={1} onChange={console.info} size=\"small\" />\n    </>\n  );\n};\n",
  'core/components/surfaces/Card':
    'import { css } from \'@emotion/css\';\nimport { FontSize, LineHeight } from \'../../../constants/Style\';\nimport { gutter } from \'../../../helpers/Style\';\nimport { Card } from \'.\';\n\nexport const Story = () => (\n  <>\n    <h3>Neutral</h3>\n    <Card shadow="neutral">\n      <div className={styleInner}>\n        <p>\n          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。\n        </p>\n      </div>\n    </Card>\n\n    <h3>Dialog</h3>\n    <Card shadow="dialog">\n      <div className={styleInner}>\n        <p>\n          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。\n        </p>\n      </div>\n    </Card>\n\n    <h3>Floating</h3>\n    <Card shadow="floating">\n      <div className={styleInner}>\n        <p>\n          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。\n        </p>\n      </div>\n    </Card>\n\n    <h3>Deep</h3>\n    <Card shadow="deep">\n      <div className={styleInner}>\n        <p>\n          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。\n        </p>\n      </div>\n    </Card>\n\n    <h3>Hover</h3>\n    <Card hover>\n      <div className={styleInner}>\n        <p>\n          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。\n        </p>\n      </div>\n    </Card>\n\n    <h3>Max Width = 200</h3>\n    <Card shadow="neutral" maxWidth={200}>\n      <div className={styleInner}>\n        <p>\n          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。\n        </p>\n      </div>\n    </Card>\n  </>\n);\n\nconst styleInner = css({\n  padding: gutter(4),\n  fontSize: FontSize.Regular,\n  lineHeight: LineHeight.Regular,\n});\n',
  'core/components/utils/Box':
    "import { Box } from '.';\n\nexport const Story = () => (\n  <>\n    <h3>Horizontal</h3>\n    <Box orientation=\"horizontal\">\n      <Box.Cell>\n        <div style={{ color: 'white', background: 'red', padding: 16 }}>hello world</div>\n      </Box.Cell>\n      <Box.Cell type=\"filled\">\n        <div style={{ color: 'white', background: 'blue', padding: 16 }}>\n          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。\n        </div>\n      </Box.Cell>\n      <Box.Cell>\n        <div style={{ color: 'white', background: 'red', padding: 16 }}>Goodbye</div>\n      </Box.Cell>\n    </Box>\n    <h3>Vertical</h3>\n    <Box orientation=\"vertical\">\n      <Box.Cell>\n        <div style={{ color: 'white', background: 'red', padding: 16 }}>hello world</div>\n      </Box.Cell>\n      <Box.Cell type=\"filled\">\n        <div style={{ color: 'white', background: 'blue', padding: 16 }}>\n          {[...Array(3).keys()].map(i => (\n            <p key={i}>\n              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。\n            </p>\n          ))}\n        </div>\n      </Box.Cell>\n      <Box.Cell>\n        <div style={{ color: 'white', background: 'red', padding: 16 }}>Goodbye</div>\n      </Box.Cell>\n    </Box>\n  </>\n);\n",
  'core/components/utils/Modal':
    "import { css } from '@emotion/css';\nimport { useState } from 'react';\nimport { FontSize, Shadow } from '../../../constants/Style';\nimport { gutter } from '../../../helpers/Style';\nimport { Modal } from '.';\n\nexport const Story = () => {\n  const [visible1, setVisible1] = useState(false);\n  const [visible2, setVisible2] = useState(false);\n\n  return (\n    <>\n      <h3>Normal content</h3>\n      <button onClick={() => setVisible1(true)}>Open</button>\n\n      <h3>Very long content</h3>\n      <button onClick={() => setVisible2(true)}>Open</button>\n\n      <Modal visible={visible1} onClickOutside={() => setVisible1(false)}>\n        <article className={styleCard}>\n          <h1>Hello!!</h1>\n          <nav>\n            <button onClick={() => setVisible1(false)}>Close</button>\n          </nav>\n        </article>\n      </Modal>\n\n      <Modal visible={visible2} onClickOutside={() => setVisible2(false)}>\n        <article className={styleCard}>\n          <h1>ポラーノの広場</h1>\n          <p>そのころわたくしは、モリーオ市の博物局に勤めて居りました</p>\n          <p>\n            十八等官でしたから役所のなかでも、ずうっと下の方でしたし俸給もほんのわずかでしたが、受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。殊にそのころ、モリーオ市では競馬場を植物園に拵こしらえ直すというので、その景色のいいまわりにアカシヤを植え込んだ広い地面が、切符売場や信号所の建物のついたまま、わたくしどもの役所の方へまわって来たものですから、わたくしはすぐ宿直という名前で月賦で買った小さな蓄音器と二十枚ばかりのレコードをもって、その番小屋にひとり住むことになりました。わたくしはそこの馬を置く場所に板で小さなしきいをつけて一疋の山羊を飼いました。毎朝その乳をしぼってつめたいパンをひたしてたべ、それから黒い革のかばんへすこしの書類や雑誌を入れ、靴もきれいにみがき、並木のポプラの影法師を大股にわたって市の役所へ出て行くのでした。\n          </p>\n          <p>\n            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。\n          </p>\n          <p>\n            五月のしまいの日曜でした。わたくしは賑やかな市の教会の鐘の音で眼をさましました。もう日はよほど登って、まわりはみんなきらきらしていました。時計を見るとちょうど六時でした。わたくしはすぐチョッキだけ着て山羊を見に行きました。すると小屋のなかはしんとして藁が凹んでいるだけで、あのみじかい角も白い髯も見えませんでした。\n          </p>\n          <p>「あんまりいい天気なもんだから大将ひとりででかけたな。」</p>\n          <p>\n            わたくしは半分わらうように半分つぶやくようにしながら、向うの信号所からいつも放して遊ばせる輪道の内側の野原、ポプラの中から顔をだしている市はずれの白い教会の塔までぐるっと見まわしました。けれどもどこにもあの白い頭もせなかも見えていませんでした。うまやを一まわりしてみましたがやっぱりどこにも居ませんでした。\n          </p>\n          <nav>\n            <button onClick={() => setVisible2(false)}>Close</button>\n          </nav>\n        </article>\n      </Modal>\n    </>\n  );\n};\n\nconst styleCard = css`\n  width: 400px;\n  padding: ${gutter(4)};\n  font-size: ${FontSize.Regular};\n  background: white;\n  box-shadow: ${Shadow.Dialog};\n\n  > p {\n    font-size: ${FontSize.Large};\n  }\n`;\n",
  'core/components/utils/Popover':
    "import { css } from '@emotion/css';\nimport { ChangeEvent, ComponentProps, useState } from 'react';\nimport { FontSize, Shadow } from '../../../constants/Style';\nimport { gutter } from '../../../helpers/Style';\nimport { Popover } from '.';\n\nexport const Story = () => {\n  const [visible, setVisible] = useState(false);\n  const [position, setPosition] = useState<ComponentProps<typeof Popover>['position']>('top');\n  const [alignment, setAlignment] = useState<ComponentProps<typeof Popover>['alignment']>('center');\n  const [target, setTarget] = useState('#target1');\n\n  const handleClickShow = (targetSelector: string, position: ComponentProps<typeof Popover>['position']) => {\n    setTarget(targetSelector);\n    setPosition(position);\n    setVisible(true);\n  };\n\n  const handleChangeAlignment = (e: ChangeEvent<HTMLInputElement>) =>\n    setAlignment(e.target.value as ComponentProps<typeof Popover>['alignment']);\n\n  return (\n    <>\n      <h3>Basic</h3>\n      <div className={styleContainer}>\n        <table style={{ marginLeft: gutter(8) }}>\n          <tbody>\n            <tr>\n              <td />\n              <td>\n                <button id=\"target1\" onClick={() => handleClickShow('#target1', 'top')}>\n                  👆\n                </button>\n              </td>\n              <td />\n            </tr>\n            <tr>\n              <td>\n                <button id=\"target2\" onClick={() => handleClickShow('#target2', 'left')}>\n                  👈\n                </button>\n              </td>\n              <td />\n              <td>\n                <button id=\"target3\" onClick={() => handleClickShow('#target3', 'right')}>\n                  👉\n                </button>\n              </td>\n            </tr>\n            <tr>\n              <td />\n              <td>\n                <button id=\"target4\" onClick={() => handleClickShow('#target4', 'bottom')}>\n                  👇\n                </button>\n              </td>\n              <td />\n            </tr>\n          </tbody>\n        </table>\n        <div>\n          <h4>Alignment</h4>\n          <ul className={styleAlignmentsList}>\n            {['start', 'center', 'end'].map(type => (\n              <li key={type}>\n                <label>\n                  <input\n                    type=\"radio\"\n                    name=\"alignment\"\n                    checked={type === alignment}\n                    value={type}\n                    onChange={handleChangeAlignment}\n                  />\n                  <span>{type}</span>\n                </label>\n              </li>\n            ))}\n          </ul>\n        </div>\n      </div>\n\n      <Popover\n        targetSelector={target}\n        position={position}\n        alignment={alignment}\n        visible={visible}\n        onClickOutside={() => setVisible(false)}\n      >\n        <p className={styleCard}>\n          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。\n        </p>\n      </Popover>\n    </>\n  );\n};\n\nconst styleContainer = css`\n  display: flex;\n\n  > :not(:first-child) {\n    margin-left: ${gutter(12)};\n  }\n`;\n\nconst styleAlignmentsList = css`\n  > li > label {\n    display: inline-flex;\n    align-items: center;\n\n    > :not(:first-child) {\n      margin-left: ${gutter(1)};\n    }\n  }\n`;\n\nconst styleCard = css`\n  padding: ${gutter(4)};\n  font-size: ${FontSize.Regular};\n  background: white;\n  box-shadow: ${Shadow.Floating};\n`;\n",
  'core/components/utils/SplitPane':
    "import { SplitPane } from '.';\n\nexport const Story = () => (\n  <SplitPane\n    minSize={100}\n    maxSize={600}\n    defaultSize={240}\n    primary=\"second\"\n    onStarted={() => console.info('started')}\n    onFinished={console.info}\n  >\n    <div>\n      <h3>1st Pane hello world!</h3>\n      <p>\n        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。\n      </p>\n    </div>\n    <div>\n      <h3>2nd Pane Goodbye world</h3>\n      <p>\n        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。\n      </p>\n      <p>\n        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。\n      </p>\n      <p>\n        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。\n      </p>\n    </div>\n  </SplitPane>\n);\n",
  'core/components/utils/Transition':
    "import { css } from '@emotion/css';\nimport { useState } from 'react';\nimport { FontSize, Shadow } from '../../../constants/Style';\nimport { gutter } from '../../../helpers/Style';\nimport { Transition } from '.';\n\nexport const Story = () => {\n  const [state1, setState1] = useState(false);\n  const [state2, setState2] = useState(false);\n  const [state3, setState3] = useState(false);\n\n  const handleToggle1 = () => setState1(state => !state);\n  const handleToggle2 = () => setState2(state => !state);\n  const handleToggle3 = () => setState3(state => !state);\n\n  return (\n    <>\n      <h3>Horizontal ( Default )</h3>\n      <button onClick={handleToggle1}>Toggle</button>\n\n      <Transition id={`${state1}`}>\n        {state1 ? (\n          <article className={styleCard}>\n            <p>\n              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。\n            </p>\n          </article>\n        ) : (\n          <article className={styleCard}>\n            <p>\n              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n              dolore magna aliqua.\n            </p>\n          </article>\n        )}\n      </Transition>\n\n      <h3>Vertical</h3>\n      <button onClick={handleToggle2}>Toggle</button>\n\n      <Transition id={`${state2}`} type=\"vertical\">\n        {state2 ? (\n          <article className={styleCard}>\n            <p>\n              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。\n            </p>\n          </article>\n        ) : (\n          <article className={styleCard}>\n            <p>\n              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n              dolore magna aliqua.\n            </p>\n          </article>\n        )}\n      </Transition>\n\n      <h3>Scale</h3>\n      <button onClick={handleToggle3}>Toggle</button>\n\n      <Transition id={`${state3}`} type=\"scale\">\n        {state3 ? (\n          <article className={styleCard}>\n            <p>\n              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。\n            </p>\n          </article>\n        ) : (\n          <article className={styleCard}>\n            <p>\n              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n              dolore magna aliqua.\n            </p>\n          </article>\n        )}\n      </Transition>\n    </>\n  );\n};\n\nconst styleCard = css`\n  padding: ${gutter(4)};\n  margin: ${gutter(2)};\n  font-size: ${FontSize.Regular};\n  background: white;\n  box-shadow: ${Shadow.Floating};\n`;\n",
  'core/constants/Style':
    "import { css } from '@emotion/css';\nimport { gutter } from '../../helpers/Style';\nimport { Color, FontSize, LineHeight, Shadow } from '.';\n\ntype ColorItem = {\n  name: string;\n  hex: string;\n};\n\nexport const Story = () => {\n  const colors = Object.entries(Color).map(([name, hex]) => ({ name, hex }));\n\n  return (\n    <ul className={styleBase}>\n      {colors.map(({ name, hex }) => (\n        <li key={name}>\n          <ColorBox name={name} hex={hex} />\n        </li>\n      ))}\n    </ul>\n  );\n};\n\nconst ColorBox = ({ name, hex }: ColorItem) => (\n  <div\n    className={styleColorBox}\n    style={{\n      backgroundColor: hex,\n      color: getReadableColor(hex),\n    }}\n  >\n    <div className={styleColorName}>{name}</div>\n    <code className={styleColorValue}>{hex}</code>\n  </div>\n);\n\n/**\n * コントラスト比的に対照的な（背景色 vs 前景色としたとき視認性が落ちない）色を返す\n * @see https://zenn.dev/hyiromori/articles/hatena-20201112-182643\n *\n * @param color #FFCC00 のような値\n * @param darkColor #FFCC00 のような値\n * @param lightColor #FFCC00 のような値\n */\nfunction getReadableColor(color: string, darkColor = '#000000', lightColor = '#ffffff') {\n  const darkRatio = getContrastRatio(color, darkColor);\n  const lightRatio = getContrastRatio(color, lightColor);\n\n  return lightRatio > darkRatio ? lightColor : darkColor;\n}\n\n/**\n * 色のコントラスト比を算出する\n *\n * @param color1 #FFCC00 のような値\n * @param color2 #FFCC00 のような値\n */\nfunction getContrastRatio(color1: string, color2: string) {\n  const luminance1 = getRelativeLuminance(color1);\n  const luminance2 = getRelativeLuminance(color2);\n\n  const bright = Math.max(luminance1, luminance2);\n  const dark = Math.min(luminance1, luminance2);\n\n  return (bright + 0.05) / (dark + 0.05);\n}\n\n/**\n * 相対輝度に変換する\n *\n * @param hexColor #FFCC00 のような値\n */\nfunction getRelativeLuminance(hexColor: string) {\n  const { red, green, blue } = parseHexColor(hexColor);\n\n  const R = getRGBForCalculateLuminance(red);\n  const G = getRGBForCalculateLuminance(green);\n  const B = getRGBForCalculateLuminance(blue);\n\n  return 0.2126 * R + 0.7152 * G + 0.0722 * B;\n}\n\n/**\n * HEX 文字列を R, G, B それぞれの値にパースする\n *\n * @param value #FFCC00 のような値\n */\nfunction parseHexColor(value: string) {\n  const [, red, green, blue] = value.match(/#(..)(..)(..)/) ?? [];\n\n  return {\n    red: parseInt(`0x${red}`, 16),\n    green: parseInt(`0x${green}`, 16),\n    blue: parseInt(`0x${blue}`, 16),\n  };\n}\n\n/**\n * 人間の視覚特性にあった輝度に変換する\n *\n * @param color 0 から 255 までの RGB どれかの値\n */\nfunction getRGBForCalculateLuminance(color: number) {\n  const ratio = color / 255;\n  if (ratio <= 0.03928) {\n    return ratio / 12.92;\n  }\n\n  return ((ratio + 0.055) / 1.055) ** 2.4;\n}\n\nconst styleBase = css`\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: ${gutter(4)};\n  list-style: none;\n`;\n\nconst styleColorBox = css`\n  position: relative;\n  min-height: 120px;\n  padding: ${gutter(2)};\n  word-break: break-word;\n  box-shadow: ${Shadow.Neutral};\n`;\n\nconst styleColorName = css`\n  font-size: ${FontSize.Regular};\n  line-height: ${LineHeight.Compressed};\n`;\n\nconst styleColorValue = css`\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  font-size: ${FontSize.Medium};\n  font-weight: bold;\n  line-height: 1.2;\n  text-align: center;\n  transform: translate3d(-50%, -50%, 0);\n`;\n",
  'core/hooks/useShuffleLetters':
    "import { css } from '@emotion/css';\nimport React, { ReactNode, useRef, useState } from 'react';\nimport { gutter } from '../../helpers/Style';\nimport { useShuffleLetters } from '.';\n\nexport const Story = () => {\n  const ref1 = useRef<HTMLDivElement>(null);\n  const ref2 = useRef<HTMLParagraphElement>(null);\n\n  const [value, setValue] = useState('');\n  const [input, setInput] = useState('hello world!');\n\n  const [startShuffle1] = useShuffleLetters(ref1);\n  const [startShuffle2] = useShuffleLetters(ref2);\n\n  const handleSubmit = () => {\n    setValue(input);\n    startShuffle1(input);\n  };\n\n  return (\n    <>\n      <h4>Submit</h4>\n      <form onSubmit={e => e.preventDefault()}>\n        <input value={input} onChange={e => setInput(e.target.value)} />\n        <button onClick={handleSubmit}>submit</button>\n      </form>\n      <p ref={ref1}>{value}</p>\n\n      <h3>Click</h3>\n      <p className={styleParagraph} ref={ref2} role=\"presentation\" onClick={() => startShuffle2('my name is wakamsha')}>\n        my name is wakamsha\n      </p>\n\n      <h3>Hover</h3>\n      <ul className={styleList}>\n        {['John Lennon', 'Paul McCartney', 'George Harrison', 'Ringo Starr'].map((name, i) => (\n          <ListItem key={i}>{name}</ListItem>\n        ))}\n      </ul>\n    </>\n  );\n};\n\nconst ListItem = ({ children }: { children: ReactNode }) => {\n  const ref = useRef<HTMLLIElement>(null);\n\n  const [startShuffle] = useShuffleLetters(ref);\n\n  return (\n    <li ref={ref} onMouseEnter={() => startShuffle(children as string)}>\n      {children}\n    </li>\n  );\n};\n\nconst styleParagraph = css`\n  cursor: pointer;\n`;\n\nconst styleList = css`\n  > li + li {\n    margin-top: ${gutter(3)};\n  }\n`;\n",
} as const;
