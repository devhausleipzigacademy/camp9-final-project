import React from 'react';
import '../styles/navbar.css';

interface NavbarProps {
  primary?: boolean;
  svg?: string;
  onClick?: () => void;
  able?: boolean;
}
export const Navbar = ({
  primary = false,
  svg,
  able = false,
  ...NavbarProps
}: NavbarProps) => {
  const mode = primary ? 'box_container--primary' : 'box_container--secondary';
  return (
    <>
      <nav>
        <div
          className={['storybook- ', `box_container `, mode].join(' ')}
          {...NavbarProps}
        >
          <button className="single_box">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width="24" height="24" fill="url(#pattern0)" />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_476_460"
                    transform="scale(0.0111111)"
                  />
                </pattern>
                <image
                  id="image0_476_460"
                  width="90"
                  height="90"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuUlEQVR4nO2cPY8NYRiGr2RlURDaJSoKOpr1D2joJRQalY9Sq3PwC1SKFT0Vf8BHY1UKKuKjFDZBQtwyyUzC2D1md96Z93mfea7kbs7ZM3Pf93nznvPsTA4EQRAEQRAEf7MDuAF8AD4Cs/qxICFLwFNALT0HDkTTaTgKvFmn5EbvgeUoux/ngG9zSm5U/c3Zjsdc/GMLar9hs/r5ybAA3OpQcFs369fOY/afY1TPT4JdwP0tlNzoIbBnzvHbK7mt6oPWPQeBlz1KbvQKOLzBObq83jUngE8JSm70BTi1znkmXfQF4EfCkhv9BK62zjXJorcDdwYouK17wM6pFr20wRAylJrhZlJFL9ffWzWyup7TBWeArxlK3oyKZqHDsGBFRQ8hDwwU6LroQ4mGkCh6xCFEsaL/5Uo9MKhAFUF11WPFQFnqIfNXbsYeQjSQTF+5OQa8NVCSEqn6d+pxjFHCEKIt6DtwHgOUNISoh24D23KVvLuwIUQ99QjYO3bJJQ4hSqDXwJGxSj5Z6BCihFduTg9dcslDiBLqF3BtiIKrex3uGggoY1pJfR/IdQOhZFRVN8nIcTVEBQ02UTTDF/0uZdFTGEpkYetYrMuOLYQ8N0VqYspG7uCKovOXoljRZC8stg5sK/ZooujsqzBWNPmLi62D/KW636On4M1VGBn25iqMDHtzFUaGvbkKI8PeXIWRYW+uwsiwN1dhZNibqzAy7M1VGBn25iqMDHtzFUaGvbkKI8PeXIWRYW+uwsiwN1dhZNibqzAy7M1VGBn25iqMDHtzFUaGvbkKI8PeXIWRYW+uwsiwN1dhZNjbplkbKJAM6nPOop8ZKEAj6UnOoi8bKEAj6WLu3xZ9YaAEDaxVC7+Uvt952avAPoxQrexL9T7m4QNyDXhcbxfZV3IQBEEQBEEQBEEQBAHG+A35uRv+u/0KggAAAABJRU5ErkJggg=="
                />
              </defs>
            </svg>
          </button>
          <button className="single_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button className="single_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

// function Navbar() {
//   return (
//     <>
//       <nav>
//         <div className="box_container">
//           <button className="single_box">
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               xmlnsXlink="http://www.w3.org/1999/xlink"
//             >
//               <rect width="24" height="24" fill="url(#pattern0)" />
//               <defs>
//                 <pattern
//                   id="pattern0"
//                   patternContentUnits="objectBoundingBox"
//                   width="1"
//                   height="1"
//                 >
//                   <use
//                     xlinkHref="#image0_476_460"
//                     transform="scale(0.0111111)"
//                   />
//                 </pattern>
//                 <image
//                   id="image0_476_460"
//                   width="90"
//                   height="90"
//                   xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuUlEQVR4nO2cPY8NYRiGr2RlURDaJSoKOpr1D2joJRQalY9Sq3PwC1SKFT0Vf8BHY1UKKuKjFDZBQtwyyUzC2D1md96Z93mfea7kbs7ZM3Pf93nznvPsTA4EQRAEQRAEf7MDuAF8AD4Cs/qxICFLwFNALT0HDkTTaTgKvFmn5EbvgeUoux/ngG9zSm5U/c3Zjsdc/GMLar9hs/r5ybAA3OpQcFs369fOY/afY1TPT4JdwP0tlNzoIbBnzvHbK7mt6oPWPQeBlz1KbvQKOLzBObq83jUngE8JSm70BTi1znkmXfQF4EfCkhv9BK62zjXJorcDdwYouK17wM6pFr20wRAylJrhZlJFL9ffWzWyup7TBWeArxlK3oyKZqHDsGBFRQ8hDwwU6LroQ4mGkCh6xCFEsaL/5Uo9MKhAFUF11WPFQFnqIfNXbsYeQjSQTF+5OQa8NVCSEqn6d+pxjFHCEKIt6DtwHgOUNISoh24D23KVvLuwIUQ99QjYO3bJJQ4hSqDXwJGxSj5Z6BCihFduTg9dcslDiBLqF3BtiIKrex3uGggoY1pJfR/IdQOhZFRVN8nIcTVEBQ02UTTDF/0uZdFTGEpkYetYrMuOLYQ8N0VqYspG7uCKovOXoljRZC8stg5sK/ZooujsqzBWNPmLi62D/KW636On4M1VGBn25iqMDHtzFUaGvbkKI8PeXIWRYW+uwsiwN1dhZNibqzAy7M1VGBn25iqMDHtzFUaGvbkKI8PeXIWRYW+uwsiwN1dhZNibqzAy7M1VGBn25iqMDHtzFUaGvbkKI8PeXIWRYW+uwsiwN1dhZNjbplkbKJAM6nPOop8ZKEAj6UnOoi8bKEAj6WLu3xZ9YaAEDaxVC7+Uvt952avAPoxQrexL9T7m4QNyDXhcbxfZV3IQBEEQBEEQBEEQBAHG+A35uRv+u/0KggAAAABJRU5ErkJggg=="
//                 />
//               </defs>
//             </svg>
//           </button>
//           <button className="single_box">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path
//                 fill-rule="evenodd"
//                 d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
//                 clip-rule="evenodd"
//               />
//             </svg>
//           </button>
//           <button className="single_box">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path
//                 fill-rule="evenodd"
//                 d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
//                 clip-rule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;
