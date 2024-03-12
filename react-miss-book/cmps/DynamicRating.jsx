import { SelectRating } from './SelectRating.jsx'
import { TextRating } from './TextRating.jsx'
import { StarsRating } from './StarsRating'

export function DynamicRating({ props }) {
    switch (props.cmpType) {
        case 'select':
            return <SelectRating {...props} />
        case 'text':
            return <TextRating {...props} />
        case 'stars':
            return <StarsRating {...props} />
    }
}

