import React, { useEffect, useState } from 'react';
import styles from './BusLoader.module.css';
import classNames from 'classnames';

export default function BusLoader() {
  return (
    <div className={styles.stage_root}>
      <div className={styles.stage_body}>
        <div className={styles.stage}>
          <div className={styles.ground_line}>
            <div>
              <span className={styles.line1}></span>
              <span className={styles.line2}></span>
              <span className={styles.line3}></span>
              <span className={styles.line4}></span>
              <span className={styles.line5}></span>
              <span className={styles.line6}></span>
              <span className={styles.line1}></span>
              <span className={styles.line2}></span>
              <span className={styles.line3}></span>
              <span className={styles.line4}></span>
              <span className={styles.line5}></span>
              <span className={styles.line6}></span>
            </div>
          </div>
          <div className={styles.tree_wrap}>
            <div className={styles.tree}>
              <div className={styles.stem}>
                <div
                  className={classNames({ [styles.branch]: true, [styles.branch1]: true })}
                ></div>
                <div
                  className={classNames({ [styles.branch]: true, [styles.branch2]: true })}
                ></div>
                <div
                  className={classNames({ [styles.branch]: true, [styles.branch3]: true })}
                ></div>
              </div>
              <div className={classNames({ [styles.leef]: true, [styles.leef1]: true })}></div>
              <div className={classNames({ [styles.leef]: true, [styles.leef2]: true })}></div>
            </div>
          </div>
          <div className={styles.love_front}></div>
          <div className={styles.love_back}></div>
          <div className={styles.vehicle_body}>
            <div className={styles.wrap_body}>
              <div className={classNames({ [styles.rooftop]: true, [styles.back]: true })}></div>
              <div className={classNames({ [styles.rooftop]: true, [styles.front]: true })}></div>
              <div className={styles.body_cover}>
                <div className={styles.top_roof}></div>
                <div
                  className={classNames({ [styles.indi]: true, [styles.back_top_indicator]: true })}
                ></div>
                <div
                  className={classNames({
                    [styles.indi]: true,
                    [styles.back_bottom_indicator]: true,
                  })}
                ></div>
                <div className={styles.back_window}>
                  <div
                    className={classNames({ [styles.window_base]: true, [styles.top]: true })}
                  ></div>
                  <div
                    className={classNames({ [styles.window_base]: true, [styles.bottom]: true })}
                  ></div>
                  <div className={styles.sun_shade}></div>
                  <div className={styles.curtain}></div>
                  <div className={styles.windows_glass_wrap}>
                    <div className={styles.glass}>
                      <div className={styles.light}>
                        <span className={styles.light1}></span>
                        <span className={styles.light2}></span>
                        <span className={styles.light3}></span>
                      </div>
                    </div>
                    <div className={styles.glass}>
                      <div className={styles.light}>
                        <span className={styles.light1}></span>
                        <span className={styles.light2}></span>
                        <span className={styles.light3}></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.front_window}>
                  <div className={styles.window_base}></div>
                  <div className={styles.sun_shade}></div>
                  <div className={styles.curtain}></div>
                  <div className={styles.windows_glass_wrap}>
                    <div className={styles.light}>
                      <span className={styles.light1}></span>
                      <span className={styles.light2}></span>
                      <span className={styles.light3}></span>
                    </div>
                  </div>
                  <div className={styles.air_hole}></div>
                </div>
              </div>
              <div className={styles.main_door}>
                <div className={styles.glass}>
                  <div className={styles.light}>
                    <span className={styles.light1}></span>
                    <span className={styles.light2}></span>
                  </div>
                </div>
                <div className={styles.door_handle}></div>
              </div>
              <div className={styles.side_guard}>
                <div className={styles.shade}></div>
                <div className={classNames({ [styles.bumper]: true, [styles.back]: true })}></div>
                <div className={classNames({ [styles.bumper]: true, [styles.front]: true })}></div>
                <div className={styles.front_indicator}></div>
              </div>
            </div>
            <div className={classNames({ [styles.wheel_wrap]: true, [styles.back]: true })}>
              <div className={styles.wheel_shadow}></div>
              <div className={styles.wheel}>
                <div className={styles.wheel_outer}>
                  <div className={styles.wheel_cup}></div>
                </div>
              </div>
            </div>
            <div className={classNames({ [styles.wheel_wrap]: true, [styles.front]: true })}>
              <div className={styles.wheel_shadow}></div>
              <div className={styles.wheel}>
                <div className={styles.wheel_outer}>
                  <div className={styles.wheel_cup}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
