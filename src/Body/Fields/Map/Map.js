import { Loader } from '@googlemaps/js-api-loader'
import React, { useEffect, useRef } from 'react'

const Map = ({
  apiKey,
  lat = -21.8926266,
  lng = -41.3909684,
  markers = [],
  zoom = 4,
  height = '200px',
  ...props
}) => {
  const mapRef = useRef()

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: 'weekly'
    })

    loader
      .load()
      .then(async () => {
        const { AdvancedMarkerElement } = await google.maps.importLibrary(
          'marker'
        )
        return {
          AdvancedMarkerElement
        }
      })
      .then(({ AdvancedMarkerElement }) => {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: zoom,
          mapId:  Math.floor(Math.random() * 1000000)

        })
        markers.map((item) => {
          const { position, description } = item
          const marker = new AdvancedMarkerElement({
            position,
            map
          })
          const infoWindow = new google.maps.InfoWindow({
            content: description
          })
          marker.addListener('click', () => {
            infoWindow.open({
              anchor: marker,
              map,
              shouldFocus: false
            })
          })
        })
      })
  }, [zoom])
  return <div style={{ height }} ref={mapRef} />
}

export default Map
