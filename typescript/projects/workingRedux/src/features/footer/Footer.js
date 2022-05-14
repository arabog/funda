
import {StatusFilters, colorFilterChanged} from '../filters/filtersSlice'

const onColorChange = (color, changeType) => {
          dispatchEvent(colorFilterChanged(color, changeType))
}

