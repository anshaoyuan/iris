package com.thread;

public class ThreadTest implements Runnable{
	

	@Override
	public void run() {
		try {
			Thread.sleep(1000);
			System.out.println("test");
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public static void main(String[] args) {
		System.out.println("1");
		new Thread(new ThreadTest()).start();
		System.out.println("2");
	}

}
