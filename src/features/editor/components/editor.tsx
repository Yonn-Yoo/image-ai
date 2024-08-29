'use client';

import { fabric } from 'fabric';
import { useCallback, useEffect, useRef, useState } from 'react';
import useEditor from '../hooks/use-editor';
import { ToolType } from '../types';
import Footer from './footer';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Toolbar from './toolbar';

export default function Editor() {
  const { init } = useEditor();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeTool, setActiveTool] = useState<ToolType>('select');

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  const onChangeActiveTool = useCallback(
    (tool: ToolType) => {
      if (tool === 'draw') {
        // editor?.enableDrawingMode();
      }

      if (activeTool === 'draw') {
        // editor?.disableDrawingMode();
      }

      if (tool === activeTool) {
        return setActiveTool('select');
      }

      setActiveTool(tool);
    },
    [activeTool]
  );

  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className="absolute top-[68px] h-[calc(100%-68px)] w-full flex">
        <Sidebar
          onChangeActiveTool={onChangeActiveTool}
          activeTool={activeTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar />
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
