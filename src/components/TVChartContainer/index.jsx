import React, { useEffect } from "react";
import "./index.css";
import Datafeed from "./api/";

const getLanguageFromURL = () => {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

export const TVChartContainer = () => {
  const defaultProps = {
    symbol: "Binance:BTC/USDT",
    interval: "15",
    containerId: "tv_chart_container",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  useEffect(() => {
    const widgetOptions = {
      debug: false,
      symbol: defaultProps.symbol,
      datafeed: Datafeed,
      interval: defaultProps.interval,
      container_id: defaultProps.containerId,
      library_path: defaultProps.libraryPath,
      locale: getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: defaultProps.chartsStorageUrl,
      charts_storage_api_version: defaultProps.chartsStorageApiVersion,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
      overrides: {
        "mainSeriesProperties.showCountdown": true,
        "paneProperties.background": "#131722",
        "paneProperties.vertGridProperties.color": "#363c4e",
        "paneProperties.horzGridProperties.color": "#363c4e",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.wickUpColor": "#336854",
        "mainSeriesProperties.candleStyle.wickDownColor": "#7f323f",
      },
    };

    if (window.TradingView) {
      const widget = new window.TradingView.widget(widgetOptions);

      widget.onChartReady(() => {
        console.log("Chart has loaded!");
      });
    }
  }, []);

  return <div id={defaultProps.containerId} className={"TVChartContainer"} />;
};
