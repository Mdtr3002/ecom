import styled, { createGlobalStyle,css } from 'styled-components'

export const RouletteContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`

export const RouletteBox = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`

export const RouletteBoard = styled.div`
  ${({theme}) => theme}
  background-image: url(${({Roulette_img}) => Roulette_img});
`

export const HighLightArea = styled.div`
  ${({theme}) => theme}
  background-image: url(${({highlight_img}) => highlight_img});
  opacity: 0;
`

export const Pointer = styled.div`
  ${({theme}) => theme}
  background-image: url(${({pointer_img}) => pointer_img});
`

export const RoulleteBtn = styled.div`
  width: 45%;
  padding-bottom: 10%;
  background: #6f42c1;
  cursor: pointer;
  margin: 0 auto;
  color: white;
  margin-top: 12%;
  border: 0;
  ${({forbid_start}) => forbid_start && (
    'pointer-events: none'
  )}
`


export const general_theme = {
  width: '100%',
  paddingBottom: '100%',
  backgroundPosition: 'center',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
  top: 0,
  left: 0,
}
