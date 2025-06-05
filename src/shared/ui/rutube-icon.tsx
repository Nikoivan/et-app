import { FC, SVGProps } from 'react';

export const RutubeIcon: FC<SVGProps<SVGSVGElement>> = props => (
  <svg
    width='36'
    height='40'
    viewBox='0 0 36 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    {...props}
  >
    <g filter='url(#filter0_d_378_30)'>
      <path
        d='M21.7998 3.44165C24.5997 3.44165 26.6265 4.08167 27.8799 5.36157C29.1599 6.61491 29.7998 8.64165 29.7998 11.4417V15.0413C29.7998 17.2546 29.4264 18.9747 28.6797 20.2014C27.9597 21.4281 26.8002 22.2418 25.2002 22.6418L30.2002 31.4417H22.4004L17.7998 23.0413H12.2002V31.4417H5V3.44165H21.7998ZM12.2002 17.4417H20.2002C21.8001 17.4416 22.6006 16.6412 22.6006 15.0413V11.4417C22.6006 9.84168 21.8001 9.04129 20.2002 9.04126H12.2002V17.4417Z'
        fill='url(#pattern0_378_30)'
        shapeRendering='crispEdges'
      />
    </g>
    <defs>
      <filter
        id='filter0_d_378_30'
        x='1'
        y='3.44165'
        width='33.2002'
        height='36'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='4' />
        <feGaussianBlur stdDeviation='2' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
        />
        <feBlend
          mode='normal'
          in2='BackgroundImageFix'
          result='effect1_dropShadow_378_30'
        />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow_378_30'
          result='shape'
        />
      </filter>
      <pattern
        id='pattern0_378_30'
        patternContentUnits='objectBoundingBox'
        width='1'
        height='1'
      >
        <use
          xlinkHref='#image0_378_30'
          transform='matrix(0.00520833 0 0 0.0046875 0 -0.125781)'
        />
      </pattern>
      <image
        id='image0_378_30'
        width='192'
        height='267'
        preserveAspectRatio='none'
        xlinkHref='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLQEsAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAELAMADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+Ieiiiv7gOcKKKKACiiigAooooAKKKKACiiigD9V/2E/BiaX4C8ReNZ4gLzxVrX9n2cjLk/2P4fRolaNj90Tard6lHMq8ObKAsWKKE+6a8l+A+gL4a+Dnw30lU8p18KaXqNxHgKUvNbh/tu+VgP4lvNQnDn+JgTk5zXrVf5k+IedT4g434ozWU3OFbOcbQw7buo4PAVp5bhIR6KKoYBSSWn72TV1K7/64fowcBYfwz+j34P8AB1GhGhWwPAfD+Y5olFRlVzziXAUOKs7r1bJOVWeY8SSpzlP37YSnCVnScYlFFFfGn7uFFFFABRRRQAUUUUAFFFFAH839FFFf60H/ABThRRRQAUUUUAFFFFABRRRQAUUUUAf0YaRZrp2laZp6LtSx0+ys0XptW2tooVXA9AgFaFV7Wdbq1trlCClxbwzqRyCs0ayKQfQhhirFf5N1ZTlVqyqX9pKrVlUvv7SVSpKpe+t+eU731vc/7UMHToUsHhKWF5VhaWEwlLC8tuX6tSwuGp4bltpy/V6eH5bacvLbSwUUUVmdAUUUUAFFFFABRRRQAUUUUAfzf0UUV/rQf8U4UUUUAFFFFABRRRQAUUUUAFFFFAH7/wDwn1pPEPwx+H+tK4dr/wAHeHppyDkLdrpdtFex57mK7jniJ9UNeg18hfsU+Lk8QfB2LQpJd154M1rUdJZGOZPsGoSnWrCY8k+WXv7y0izggWLIBtVSfr2v8vuNcpnkXF/E2Uzg4fUs8zKFJNWvhquLrYvCSjt7ssLjcO4tXXKt3Zn/AF9eAHGuH8RfA/wl41w9aNd594e8KV8XOMlJxzTBZLgcmzmlUabtVo5zkOZwqp2kqk23GKnBBRRRXzB+vBRRRQAUUUUAFFFFABRRRQB/N/RRRX+tB/xThRRRQAUUUUAFFFFABRRRQAUUUUAfXv7GPxETwf8AFL/hG76cQ6T4/tI9GJdtsaa9aPJcaDIxJ5ad5L3SYUAJa41SHkBTn9g6/nGtbq4srm3vbOaS2u7SeG6tbiFzHNb3FvIssE0TqQySRSosiOpBVlBByK/db4E/FSz+Lnw80nxIskS63bIul+KLKPaptNdtIoxcyLEv+rtdQRo9RsgNyrb3KwFzNBMq/wAefSR4NqUMwwHG+Dot4bHU6OVZy4RbVHG4eM1luKqWWkcXhVPBynKy+sYSjFu9SCf+6P7Kfx4wuY8NcR/R9z3HRhm3D2Jx/GXAcK9VKWO4fzOrRqcVZPhVOSc62SZxKjntPD07y/s3O8fVhDkw1dx9jooor+Wj/YcKKKKACiiigAooooAKKKKAP5v6KKK/1oP+KcKKKKACiiigAooooAKKKKACiiigAr3b9n74z33wZ8axanJ51z4W1kQ6f4q0yL5mlsVkYwajaxkhG1HSXkkntgcefBJd2O+IXZmj8JorzM5yfL8/yvHZNmuHjisvzHD1MNiaMtG4TV41Kc7N0q9GpGnXoVoe/Rr0qVSLvFqf1nAnHHE3hrxhw7x5wbmdXKOJuFs0w2bZTjqXvRjXoSaqYfE0XKMMXgMfhqmJy/MsDWboY3L8bi8LVXLUhOh/RfpGr6Zr2l2GtaNe2+o6VqlpDfaffWr+ZBdWtwgkimjbg4ZWGVYK6NlJFV1ZRo1+OX7Nn7Sd78Jb1PDHid7nUfh7qFyXdEDz3fhi7nfMupabFy0tjM5Mmp6YnzO26+sV+2faINQ/XzSNX0vXtMstZ0W/tNU0rUbdLqx1CxmS4tbqCT7skMsZZWGQVYZ3I6tG4V1ZR/nb4i+HWb+H2bzwuKhUxWUYqpUlk+cRptUcXRTclQruKcMPmOHg4xxOGlKPNy/WcN7XDVU6H/UZ9Fv6UnBH0muCKOb5RWwuUccZRhcNT444GqYmMsfkmPlGNKWYZfGrKOIzLhfMsRGpUynNqdOp7H2n9lZr9UzbCThmGjRRRX54f1AFFFFABRRRQAUUUUAfzf0UUV/rQf8AFOFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFe6/Bn9oDxt8Gb7Zpco1jwvdTCXU/CuoTSLYzM2BJdadMBI+laiUAU3UEckM+2MX1peLFCsfhVFebm+TZXn+X4jKs5wOHzHL8VHlrYbE01ODavyVISXLUo1qUnz0a9CpSr0Z2lTqxd1P6zgjjrjDw24myzjLgTiLNOF+Jsoq+1wObZTiZUK8FLlVbDYim1PDY7AYunFUcdluYYbG5fjaDdHFYSrHknR/dv4V/Hf4efFy0jPhzVktdbWLfeeF9VaK01y1KrulaK3MjJqNqnU3mnSXMCKyC4NvMWhX2Wv5xba5ubO4hu7O4ntbq3kSa3ubaWSC4gmjYNHLDNEyyRSIwDI6MrKwBBBFfWvw7/AGzfip4OSCx8RNa+PtIhCoF1p3tddjiUAbItftkeSZm5LzatZ6rOxIxIqgCv5O4y+jdj6FStjOCMfTxuGk5TWS5rWjh8bRTbfs8LmTh9VxcV8MI4yGExFrKVao7zf+0fgP8AtWeG8wwuCyL6QXDmKyDNYRpUJ8e8GYCrmWQ46SUYPFZzwpCs84yWtO3tMRUyKvnWW8znOll+Gi1Qj+wtFfH/AIS/bY+D2vJFHrza54MvGwsg1TTpNS08SHtDf6KL2Zo8nHm3VhZAHJZVQbq980b4ufC3xCiNo/xC8HXrOARAniHS4rwA9N9jPcxXkRPQCSBDnjGRX4Fm3BHGGRTlDNuGc8wfI2nVlluLrYZ2v70cXg6ONwso6XUliErNN2ukf6U8FfSC8DfEXD0cRwX4t+HueuvGMoYSlxXkuAzSLkk1Tq5NneO4fzijVTfK6UstnNSUklPlcj0SiqkF/Y3Sh7a9tLhCAQ0FzDKpB6ENG7DB7HODVa81vRdOVn1DV9LsUX7zXl/aWyr/ALzTyoB+Jr5yNCtKfs40a0ql7ezjRrSqX7ezjSlUv5cl/I/VamPwFKh9aq4/A0sKo8zxNXHYKlhlG1+Z4mpjKeHUba831jltrzW1NSivItf+PnwZ8NI7ap8SPCpaPO+DTNSj167QqMlWs9CGo3Sv6I0IY8YHIr5w8Z/t3eBdMSa38E+G9a8UXYDLHe6mY9A0jcchZEDC81SdV+80MljYFxhBMhJZPrsl8O+OOIJwjlfC2c1YTaX1nEYKtl+Dim1708XmUMBRUVe7cfau2qjK6v8AiHHv0ovo8+GmHr1uMPGDgTB16EZN5Xlmf4HibPKsopv2VHJeFK/EmPnVk1yRjV+px5/dnVpuMlH8q6KKK/01P+SEKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q=='
      />
    </defs>
  </svg>
);
