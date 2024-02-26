import type {FC, DetailedHTMLProps, HTMLAttributes} from 'react'
import {makeClassName} from './textUtil'

type TextProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>

export type TitleProps = TextProps & {
  numberOfLines?: number
}
export const Title: FC<TitleProps> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    'font-bold text-2xl text-gray-500 whitespace-pre-line ml-3',
    _className,
    numberOfLines
  )
  return <p {...props} className={className} />
}

export type SubtitleProps = TitleProps & {}
export const Subtitle: FC<SubtitleProps> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    'font-semibold text-base text-gray-600 whitespace-pre-line ml-3 mt-1',
    _className,
    numberOfLines
  )
  return <p {...props} className={className} />
}

export type SummaryProps = SubtitleProps & {}
export const Summary: FC<SummaryProps> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    'text-sm whitespace-pre-line',
    _className,
    numberOfLines
  )
  return <p {...props} className={className} />
}

export type ParagraphProps = SummaryProps & {}
export const Paragraph: FC<ParagraphProps> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    'font-normal text-base whitespace-pre-line',
    _className,
    numberOfLines
  )
  return <p {...props} className={className} />
}
